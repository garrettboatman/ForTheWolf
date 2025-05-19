import AllEpisodesTable from "@/components/AllEpisodesTable";
import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { client } from "@/utils/sanityClient";

const POSTS_QUERY = `*[
  _type == "episode"
  && defined(slug.current)
]|order(publishedAt desc)[0...1000]{_id, episode_number, title, slug, air_date, duration, scribe}`;

const options = { next: { revalidate: 30 } };

export default async function AllEpisodesPage() {
  const episodes = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);
  return (
    <div className="p-4 space-y-4">
      <Link href={"/"}>{"<"} Home</Link>
    <AllEpisodesTable episodes={episodes}/>
    </div>
  )
}