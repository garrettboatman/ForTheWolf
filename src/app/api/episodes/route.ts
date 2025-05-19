import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import Fuse from 'fuse.js';
// import { Client } from "@elastic/elasticsearch";
import { Episode } from "@/utils/types";

// Cache mechanism to avoid reading the file on every request
let episodesCache: Episode[] | null = null;
// let esClient: Client | null = null;
// let isIndexReady = false;

// // In-memory Elasticsearch client for local search
// function getElasticsearchClient() {
//   if (!esClient) {
//     // Create a new client with default options (connects to localhost:9200)
//     // For production, you would use actual Elasticsearch credentials
//     esClient = new Client({
//       node: process.env.ELASTICSEARCH_URL || "http://localhost:9200",
//     });
//   }
//   return esClient;
// }

// Create index and initialize with data
// async function ensureIndexReady() {
//   if (isIndexReady) return;

//   const client = getElasticsearchClient();
//   const indexName = "episodes";

//   try {
//     // Check if index exists
//     const indexExists = await client.indices.exists({ index: indexName });

//     if (!indexExists) {
//       // Create index with mapping
//       await client.indices.create({
//         index: indexName,
//         mappings: {
//           properties: {
//             id: { type: "keyword" },
//             title: { type: "text", analyzer: "english" },
//             script: { type: "text", analyzer: "english" },
//             link: { type: "keyword" },
//             duration: { type: "keyword" },
//             air_date: {
//               type: "date",
//               format: "strict_date_optional_time||epoch_millis",
//             },
//             embed_src: { type: "keyword" },
//           },
//         },
//       });

//       // Index data
//       const episodes = await getEpisodes();
//       const operations = episodes.flatMap((episode) => [
//         { index: { _index: indexName, _id: episode.id } },
//         episode,
//       ]);

//       if (operations.length > 0) {
//         await client.bulk({ refresh: true, operations });
//       }
//     }

//     isIndexReady = true;
//   } catch (error) {
//     console.error("Error setting up Elasticsearch:", error);
//     // Fallback to in-memory search if Elasticsearch setup fails
//   }
// }

// Function to read episodes data
async function getEpisodes(): Promise<Episode[]> {
  // Return from cache if available
  if (episodesCache) {
    return episodesCache;
  }

  // Read the file
  const filePath = path.join(process.cwd(), "public", "jnapi-episodes.json");
  const fileData = fs.readFileSync(filePath, "utf8");
  const episodes = JSON.parse(fileData).data;

  // Store in cache
  episodesCache = episodes;

  return episodes;
}

// Fallback search function for when Elasticsearch isn't available

// Enhanced in-memory search with highlighting
function enhancedLocalSearch(
  episodes: Episode[],
  query: string,
  exactPhrase: boolean,
  searchTitle: boolean,
  limit: number,
  offset: number
): {
  total: number;
  data: (Episode & { highlight?: Record<string, string[]> })[];
} {
  if (!query.trim()) return { total: 0, data: [] };

  const searchFields = searchTitle ? ["title"] : ["script"];
  let matchedEpisodes: Episode[] = [];

  // Performing the search
  if (exactPhrase) {
    // For exact phrase search
    matchedEpisodes = episodes.filter((episode) => {
      return searchFields.some((field) => {
        const value = episode[field as keyof Episode];
        return (
          value !== undefined &&
          value !== null &&
          value.toString().toLowerCase().includes(query.toLowerCase())
        );
      });
    });
  } else {
    // Using fuse.js for fuzzy (non-exact) search
    const fuse = new Fuse(episodes, {
      keys: searchFields,
      // There are a lot of options to tweak here, these settings seem decent but not great
      // List of options is available here: https://www.fusejs.io/api/options.html
      ignoreLocation: true,
      includeMatches: true,
      ignoreFieldNorm: true,
      threshold: 0.25
    });
    const fuseResults = fuse.search(query);
    matchedEpisodes = fuseResults.map(fuseResult => fuseResult.item);
  }

  // Adding highlighting to results
  const resultsWithHighlights = matchedEpisodes.map((episode) => {
    const enhancedEpisode = { ...episode } as Episode & {
      highlight?: Record<string, string[]>;
    };

    searchFields.forEach((field) => {
      const value = episode[field as keyof Episode];
      if (value === undefined || value === null) return;

      const content = value.toString();
      const lowerContent = content.toLowerCase();
      const lowerQuery = query.toLowerCase();

      if (exactPhrase && lowerContent.includes(lowerQuery)) {
        // Highlight exact phrase
        const highlightedContent = generateHighlightWithRegex(content, query);
        if (!enhancedEpisode.highlight) enhancedEpisode.highlight = {};
        enhancedEpisode.highlight[field] = [highlightedContent];
      } else if (!exactPhrase) {
        // Highlight individual terms
        const terms = lowerQuery.split(/\s+/).filter((term) => term.length > 1);
        const matches = terms.filter((term) => lowerContent.includes(term));

        let highlightedContent = content;
        // Start with longest terms first for better highlighting
        matches
          .sort((a, b) => b.length - a.length)
          .forEach((term) => {
            highlightedContent = generateHighlightForTerm(
              highlightedContent,
              term
            );
          });

        if (!enhancedEpisode.highlight) enhancedEpisode.highlight = {};
        enhancedEpisode.highlight[field] = [highlightedContent];
      }
    });

    return enhancedEpisode;
  });

  // Apply pagination
  const paginatedResults = resultsWithHighlights.slice(offset, offset + limit);

  return {
    total: resultsWithHighlights.length,
    data: paginatedResults,
  };
}

/**
 * Helper function to generate highlighted content with HTML
 * @param content
 * @param lowerContent
 * @param lowerQuery
 *
 * @deprecated
 */
function generateHighlight( // eslint-disable-line
  content: string,
  lowerContent: string,
  lowerQuery: string
): string {
  const start = lowerContent.indexOf(lowerQuery);
  if (start === -1) return content;

  const end = start + lowerQuery.length;
  const before = content.substring(0, start);
  const match = content.substring(start, end);
  const after = content.substring(end);

  // Use em tags for highlighting (similar to Elasticsearch)
  return `${before}<span class="script-match">${match}</span>${after}`;
}

/**
 * alternative to `generateHighlight()` that uses regex instead of substring.
 * replaces all instances of `query` in `content` with `<span class="script-match">${query}</span>`
 * (case-insensitive)
 *
 * @param content
 * @param query
 */
function generateHighlightWithRegex(content: string, query: string): string {
  const queryAsRegex = new RegExp(query, "gi");
  const highlightedContent = content.replace(queryAsRegex, match => {
    return `<span class="script-match">${match}</span>`;
  });
  return highlightedContent;
}

// Recursive helper function to highlight individual term
function generateHighlightForTerm(content: string, lowerTerm: string): string {
  const lowerContent = content.toLowerCase();
  const start = lowerContent.indexOf(lowerTerm);
  // Recursive base case is when the term can no longer be found
  if (start === -1) return content;

  const end = start + lowerTerm.length;
  const before = content.substring(0, start);
  const match = content.substring(start, end);
  // Recursively generate the highlighting for the remaining content
  const after = generateHighlightForTerm(content.substring(end), lowerTerm);

  // Use em tags for highlighting (similar to Elasticsearch)
  return `${before}<span class="script-match">${match}</span>${after}`;
}

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("search") || "";
    const exactPhrase = searchParams.get("exactPhrase") === "true";
    const searchTitle = searchParams.get("searchTitle") === "true";
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    // Get all episodes
    const episodes = await getEpisodes();

    // Skip Elasticsearch and use enhanced local search directly
    // since we're experiencing connection errors
    if (query && query.trim() !== "") {
      const result = enhancedLocalSearch(
        episodes,
        query,
        exactPhrase,
        searchTitle,
        limit,
        offset
      );

      return NextResponse.json({
        total: result.total,
        offset,
        limit,
        data: result.data,
      });
    }

    // Default empty response for empty queries
    return NextResponse.json({
      total: 0,
      offset,
      limit,
      data: [],
    });
  } catch (error) {
    console.error("Error processing episode request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
