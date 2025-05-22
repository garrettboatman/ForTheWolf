import {NextRequest, NextResponse} from "next/server";
import {client} from "@/utils/sanityClient"
import {SanityEpisode} from "@/utils/sanity.types";
import {generateHighlightWithRegex} from "@/utils/ui";
import path from "path";
import fs from "fs";
import {parseNDJSON} from "@/utils/json";

const DEFAULT_QUERY = '*[_type == "episode" && script_text match $queryText]'

function filterAndHighlight(preliminaryResults: SanityEpisode[], phrase: string):{
  total: number;
  data: SanityEpisode[]
} {
  const actualResults = preliminaryResults.filter(ep => ep.script_text.toLowerCase().includes(phrase.toLowerCase()));
  return {
    total: actualResults.length,
    data: actualResults.map(episode => (
      {
        ...episode,
        highlight: {
          script: [generateHighlightWithRegex(episode.script_text, phrase)]
        }
      }
    ))
  }
}

/**
 * two-stage search. the first stage uses a Sanity GROQ query to perform an
 * efficient token-based search on the whole script space. groq doesn't
 * support full text search, so at this stage, the input "for the wolf"
 * will return episodes whose script includes "for" AND "the" AND "wolf".
 * the second stage performs a simple `.includes` call on the preliminary
 * results; this is where we can get what we actually want: scripts that
 * contain the literal "for the wolf". the second stage is also where we
 * highlight the results using the `script-match` span class.
 *
 * falls back to the "episodes.ndjson" file if Sanity is unreachable
 *
 * @param request
 * @constructor
 */
export async function GET(request: NextRequest) {

  const searchParams = request.nextUrl.searchParams;
  const queryText = searchParams.get("search") || "";

  try {

    const preliminaryResults = await client.fetch<SanityEpisode[]>(DEFAULT_QUERY, {queryText});
    const finalResultsWithHighlight = filterAndHighlight(preliminaryResults, queryText);
    return NextResponse.json(finalResultsWithHighlight);

  } catch (sanityError) {

    try { // fall back to filesystem if something goes wrong with Sanity

      console.error("Error processing request with sanity (falling back to filesystem): ", sanityError)
      const filePath = path.join(process.cwd(), "public", "episodes.ndjson");
      const fileData = fs.readFileSync(filePath, "utf8");
      const episodes = parseNDJSON<SanityEpisode>(fileData);
      const episodesWithHighlight = filterAndHighlight(episodes, queryText)
      return NextResponse.json(episodesWithHighlight)

    } catch (otherError) {

      console.error("Error processing episode request with filesystem:", otherError);
      return NextResponse.json(
        { error: "Failed to process request" },
        { status: 500 }
      );

    }
  }
}