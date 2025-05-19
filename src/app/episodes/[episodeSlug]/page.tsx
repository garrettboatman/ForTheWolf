import ScribeLink from "@/components/ScribeLink";
import Link from "next/link";
import VideoEmbed from "@/components/VideoEmbed";
import {client} from "@/utils/sanityClient";
import {SanityEpisode} from "@/utils/sanity.types";
import {SanityEpisodeCharacters} from "@/utils/types";

const EPISODE_QUERY = `*[_type == "episode" && slug.current == $episodeSlug][0]{..., "characters_deref": characters[]->}`;
const options = {next: {revalidate: 30}};

export async function generateStaticParams() {
  const episodes = await client.fetch<SanityEpisode[]>(`*[_type == "episode"]{slug}`)
  return episodes
    .filter(ep => !!ep.slug)
    .map(ep => ({
      episodeSlug: ep.slug!.current
    }));
}

export default async function EpisodeDetailPage({params}: {
  params: Promise<{ episodeSlug: string }>;
}) {
  const {episodeSlug} = await params;
  const episode = await client.fetch<SanityEpisodeCharacters>(EPISODE_QUERY, await params, options);

  if (!episode) {
    return (
      <div className="border-2 p-2 rounded-md">
        No episode with slug=<i>{episodeSlug}</i>
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
        <p className="text-lg lg:text-xl">Episode ID: {episode.episode_number}</p>
        <p className="text-lg lg:text-xl">Air date: {episode.air_date}</p>
        {/*TODO: youtube link and embed*/}
        <p className="text-lg lg:text-xl">
          Video:{" "}
          {
            <a
              href={
                episode.primary_video_link
              }
              className="text-blue-500 underline"
              target="_blank"
            >
              Link
            </a>
          }
        </p>
        <p className="text-lg lg:text-xl">
          Scribe: <ScribeLink scribe={episode.scribe}/>
        </p>
        <p className="text-lg lg:text-xl">
          Characters: {
          episode.characters_deref?.length > 0 ?
            episode.characters_deref?.map(c => c.character_name).join(", ") :
            <i>unknown</i>
        }
        </p>
      </div>
      <div className="my-8">
        <VideoEmbed
          video={episode.youtube_id || episode.alt_embed_src}
          isYoutube={!!episode.youtube_id}
        />
        <div className="whitespace-pre-wrap bg-white border-2 mt-6 p-4 rounded-md border-gray-600">
          {episode.script_text}
        </div>
      </div>
    </div>
  );
}
