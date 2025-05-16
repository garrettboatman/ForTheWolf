"use client";

import { Episode } from "@/utils/types";
import { formatDate } from "@/utils/ui";
import { useState } from "react";

interface EpisodeListProps {
  results: (Episode & { highlight?: Record<string, string[]> })[];
  totalResults: number;
  isLoading: boolean;
  loadMore: () => void;
  query: string;
}

export default function EpisodeList({
  results,
  totalResults,
  isLoading,
  loadMore,
  query,
}: EpisodeListProps) {
  const [visibleScripts, setVisibleScripts] = useState<Record<number, boolean>>(
    {}
  );

  const toggleScript = (episodeId: number) => {
    setVisibleScripts((prev) => ({
      ...prev,
      [episodeId]: !prev[episodeId],
    }));
  };

  if (isLoading && results.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Searching...</p>
      </div>
    );
  }

  if (results.length === 0) {
    if (query) {
      return <h2 className="text-xl font-semibold mb-4">Found 0 episodes</h2>;
    }
    return (
      <p className="text-center text-gray-500">
        Enter a search term to find episodes.
      </p>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Found {totalResults} episode{totalResults !== 1 ? "s" : ""}
        {/* {totalResults > results.length && ` (showing ${results.length})`} */}
      </h2>
      <ul className="space-y-6">
        {results.map((episode) => (
          <li
            key={episode.id}
            data-id={episode.id}
            className="border p-4 rounded-lg bg-white"
          >
            <h3 className="text-3xl font-bold">{episode.title}</h3>
            <p className="text-lg font-bold text-gray-600">
              {formatDate(episode.air_date)} | {episode.duration}
            </p>

            <div className="my-4">
              {episode.highlight &&
                Object.keys(episode.highlight).length > 0 && (
                  <button
                    onClick={() => toggleScript(episode.id)}
                    className="inline-block text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-md px-5 py-2.5 mr-2"
                  >
                    {visibleScripts[episode.id] ? "Hide Script" : "Show Script"}
                  </button>
                )}
              <a
                target="_blank"
                href={
                  episode.alt_embed_src?.includes("collegehumor")
                    ? `https://www.youtube.com/results?search_query=Jake+and+Amir:+${episode.title.replace(
                        " ",
                        "+"
                      )}`
                    : episode.alt_embed_src
                }
                className="inline-block text-white bg-slate-950 hover:bg-slate-950 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-md px-5 py-2.5 mr-2"
              >
                Watch Episode
              </a>
            </div>

            {episode.highlight && Object.keys(episode.highlight).length > 0 && (
              <div
                className={`my-6 rounded text-sm transition-all duration-300 ${
                  visibleScripts[episode.id] ? "block" : "hidden"
                }`}
              >
                {Object.entries(episode.highlight).map(
                  ([field, highlights]) => (
                    <div key={field}>
                      {highlights.map((html, i) => (
                        <p
                          key={`${episode.id}-highlight-${i}`}
                          className="mb-1 text-md font-mono"
                          dangerouslySetInnerHTML={{ __html: html }}
                        />
                      ))}
                    </div>
                  )
                )}
                {!!episode.scribe && (
                  <div>
                    Transcribed by{" "}
                    <a
                      href={`https://www.reddit.com/u/${episode.scribe}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 hover:underline mt-2 inline-block"
                    >
                      u/{episode.scribe}
                    </a>
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>

      {results.length > 0 && results.length < totalResults && (
        <div className="mt-6 text-center">
          <button
            onClick={loadMore}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {isLoading
              ? "Loading..."
              : `Load More (${results.length} of ${totalResults} episodes)`}
          </button>
        </div>
      )}
    </div>
  );
}
