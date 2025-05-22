import {SanityEpisodeWithHighlight} from "@/utils/types";
import {useEffect, useState} from "react";

const MAX_PREVIEW_LINES = 3;
const PREV_CHARACTERS = 30;
const POST_CHARACTERS = 30;
const HIGHLIGHT_TAG_START = `<span class="script-match">`;
const HIGHLIGHT_TAG_END = "</span>";

function parseMatchedChunk(matchedChunk: string): string {
  const startIndexOfMatch = matchedChunk.indexOf(HIGHLIGHT_TAG_START);
  const endIndexOfMatch = matchedChunk.indexOf(HIGHLIGHT_TAG_END);
  const preIndex = Math.max(0, startIndexOfMatch - PREV_CHARACTERS);
  const postIndex = Math.min(endIndexOfMatch + POST_CHARACTERS, matchedChunk.length);
  const preEllipsis = preIndex > 0 ? "..." : "";
  const postEllipsis = postIndex < matchedChunk.length ? "..." : "";
  return preEllipsis + matchedChunk.substring(preIndex, postIndex) + postEllipsis;
}

/**
 * displays a list of highlighted snippets, truncated at both ends. see
 * @param episode
 * @constructor
 */
export default function SearchResultPreview({episode}: { episode: SanityEpisodeWithHighlight}) {
  const [highlightedSnippets, setHighlightedSnippets] = useState<string[]>([]);

  useEffect(() => {
    if (episode.highlight?.script) {
      const chunks = episode.highlight.script[0].split("\n\n");
      setHighlightedSnippets(
        chunks.filter(chunk => chunk.includes(HIGHLIGHT_TAG_START))
          .slice(0, MAX_PREVIEW_LINES)
          .map(parseMatchedChunk)
      );
    }
  }, [episode]);

  return (
    <div>
      <ul>
        {highlightedSnippets.map((snippet, idx) => (
          <li key={idx} dangerouslySetInnerHTML={{ __html: snippet }} />
        ))}
      </ul>
    </div>
  )
}