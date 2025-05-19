"use client";

import {EpisodeWithHighlight} from "@/utils/types";
import {formatDate} from "@/utils/ui";
import {useState} from "react";
import SearchResultPreview from "@/components/SearchResultPreview";
import Link from "next/link";
import ScribeLink from "./ScribeLink";
import VideoEmbed from "./VideoEmbed";

interface EpisodeListProps {
  results: EpisodeWithHighlight[];
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

  const [visibleVideos, setVisibleVideos] = useState<Record<number, boolean>>(
    {}
  );

  const toggleScript = (episodeId: number) => {
    setVisibleScripts((prev) => ({
      ...prev,
      [episodeId]: !prev[episodeId],
    }));
  };

  const toggleVideo = (episodeId: number) => {
    setVisibleVideos((prev) => ({
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
            <h3 className="text-3xl font-bold">
              <Link href={`/episodes/${episode.id}`} target="_blank">
                {episode.title}
              </Link>
            </h3>
            <p className="text-lg font-bold text-gray-600">
              {formatDate(episode.air_date)} | {episode.duration}
            </p>

            {visibleVideos[episode.id] &&
              <div className="my-4 mb-6">
                <VideoEmbed video={episode.youtube_id || episode.alt_embed_src} isYoutube={!!episode.youtube_id} />
              </div>
            }

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
              {(episode.youtube_id || episode.alt_embed_src) ? (
                <>
                  <button
                  onClick={() => toggleVideo(episode.id)}
                  className="inline-block text-white bg-slate-950 hover:bg-slate-950 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-md px-5 py-2.5 mr-2"
                >
                  {visibleVideos[episode.id] ? "Hide Video" : "Watch Video"}
                </button>
                </>
              ) : (
                <a
                  target="_blank"
                  href={`https://www.youtube.com/results?search_query=Jake+and+Amir:+${episode.title.replace(" ","+")}`}
                  className="inline-block text-white bg-slate-950 hover:bg-slate-950 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-md px-5 py-2.5 mr-2"
                >
                  Watch Video
                </a>
              )}
            </div>

            {/* show a minimal preview of the search result; hidden when a
             user expands the search result */}
            {episode.highlight && !visibleScripts[episode.id] &&
              <SearchResultPreview episode={episode} />
            }

            {/* show the full episode result */}
            {episode.highlight && Object.keys(episode.highlight).length > 0 && visibleScripts[episode.id] && (
              <div
                className="my-6 rounded text-sm transition-all duration-300 block"
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
                  <div className="mt-2">
                    Transcribed by <ScribeLink scribe={episode.scribe} />
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
