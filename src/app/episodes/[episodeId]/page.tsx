import { Episode } from "@/utils/types";
import { fetchAllEpisodes } from "@/utils/episodeData";
import ScribeLink from "@/components/ScribeLink";
import Link from "next/link";
import VideoEmbed from "@/components/VideoEmbed";

function fetchEpisodeDetails(episodeId: number): Episode | undefined {
  return fetchAllEpisodes().find((episode) => episode.id === episodeId);
}

function fetchAllEpisodeIds(): { episodeId: string }[] {
  return fetchAllEpisodes().map((episode) => ({
    episodeId: episode.id.toString(),
  }));
}

export async function generateStaticParams() {
  return fetchAllEpisodeIds();
}

export default async function EpisodeDetailPage({
  params,
}: {
  params: Promise<{ episodeId: string }>;
}) {
  const { episodeId } = await params;
  const episode = fetchEpisodeDetails(parseInt(episodeId)) as Episode & {
    script: string;
  };

  if (!episode) {
    return (
      <div className="border-2 p-2 rounded-md">
        No episode with id=<i>{episodeId}</i>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-2">
        <Link className="font-bold" href={"/"}>
          Home
        </Link>
        {" < "}
        <Link className="font-bold" href={"/episodes"}>
          All Episodes
        </Link>{" "}
        {" < "}
        {episode.title}
      </div>
      <div className="my-8">
        <p className="text-2xl lg:text-3xl font-semibold">{episode.title}</p>
        <p className="text-lg lg:text-xl">Episode ID: {episode.id}</p>
        <p className="text-lg lg:text-xl">Air date: {episode.air_date}</p>
        {/*TODO: youtube link and embed*/}
        <p className="text-lg lg:text-xl">
          Video:{" "}
          {
            <a
              href={
                episode.youtube_id
                  ? `https://www.youtube.com/watch?v=${episode.youtube_id}`
                  : episode.alt_embed_src
              }
              className="text-blue-500 underline"
              target="_blank"
            >
              Link
            </a>
          }
        </p>
        <p className="text-lg lg:text-xl">
          Scribe: <ScribeLink scribe={episode.scribe} />
        </p>
      </div>
      <div className="my-8">
        <VideoEmbed
          video={episode.youtube_id || episode.alt_embed_src}
          isYoutube={!!episode.youtube_id}
        />
        <div className="border-2 mt-6 p-4 rounded-md border-gray-600">
          <span dangerouslySetInnerHTML={{ __html: episode.script }}></span>
        </div>
      </div>
    </div>
  );
}
