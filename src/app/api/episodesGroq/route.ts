import {NextRequest, NextResponse} from "next/server";
import {client} from "@/utils/sanityClient"
import {SanityDocument} from "next-sanity";
import {Episode, sanityDocumentToEpisode} from "@/utils/types";
import {generateHighlightWithRegex} from "@/app/api/episodes/route";

const DEFAULT_QUERY = '*[_type == "episode" && script_text match' +
  ' $queryText]'

function filterAndHighlight(preliminaryResults: SanityDocument[], phrase: string):{
  total: number;
  data: (Episode & { highlight?: Record<string, string[]> })[];
} {
  const actualResults = preliminaryResults.filter(ep => ep.script_text.includes(phrase));
  return {
    total: actualResults.length,
    data: actualResults.map(sd => (
      {
        ...sanityDocumentToEpisode(sd),
        highlight: {
          script: [generateHighlightWithRegex(sd.script_text, phrase)]
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
 * @param request
 * @constructor
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const queryText = searchParams.get("search") || "";
    const preliminaryResults = await client.fetch<SanityDocument[]>(DEFAULT_QUERY, {queryText});
    const finalResultsWithHighlight = filterAndHighlight(preliminaryResults, queryText);
    return NextResponse.json({total: finalResultsWithHighlight.total, data: finalResultsWithHighlight.data});
  } catch (error) {
    console.error("Error processing episode request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}