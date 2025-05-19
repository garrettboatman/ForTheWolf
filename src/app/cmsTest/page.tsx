import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { client } from "@/utils/sanityClient";

const POSTS_QUERY = `*[
  _type == "episode"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, air_date}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const episodes = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">Episodes</h1>
      <ul className="flex flex-col gap-y-4">
        {episodes.map(episode => (
          <li className="hover:underline" key={episode._id}>
            <Link href={`/cmsTest/${episode.slug.current}`}>
              <h2 className="text-xl font-semibold">{episode.title}</h2>
              <p>{new Date(episode.air_date).toLocaleDateString()}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}