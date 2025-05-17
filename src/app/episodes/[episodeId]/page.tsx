import {Episode} from "@/utils/types";
import {fetchAllEpisodes} from "@/utils/episodeData";

function fetchEpisodeDetails(episodeId: number): Episode | undefined {
  return fetchAllEpisodes().find(episode => episode.id === episodeId);
}

function fetchAllEpisodeIds(): {episodeId: string}[] {
  return fetchAllEpisodes().map(episode => ({episodeId: episode.id.toString()}));
}

export async function generateStaticParams() {
  return fetchAllEpisodeIds();
}

export default async function EpisodeDetailPage({params}: {params: Promise<{ episodeId: string}>}) {
  const { episodeId } = await params;
  const episode = fetchEpisodeDetails(parseInt(episodeId)) as Episode & {script: string};

  if (!episode) {
    return (
      <div className="border-2 p-2 rounded-md">No episode with id=<i>{episodeId}</i></div>
    )
  }

  return (
    <>
    <div className="mb-6">
      <p className="text-2xl font-semibold">Title: {episode.title}</p>
      <p className="text-xl">Episode #: {episode.id}</p>
      <p className="text-xl">Air date: {episode.air_date}</p>
      {/*TODO: youtube link and embed*/}
      <p className="text-xl">Youtube link: {episode.youtube_id}</p>
      <p className="text-xl">Alternate link: <a href={episode.alt_embed_src} className="text-blue-500" target="_blank">{episode.alt_embed_src}</a></p>
      <p className="text-xl">Scribe: {episode.scribe}</p>
    </div>
    <div className="border-2 p-2 rounded-md border-gray-600">
      <span dangerouslySetInnerHTML={{__html: episode.script}} ></span>
    </div>
    </>
  )
}