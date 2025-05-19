import { PortableText, type SanityDocument } from "next-sanity";
import { client } from "@/utils/sanityClient";
import Link from "next/link";

const POST_QUERY = `*[_type == "episode" && slug.current == $episodeId][0]`;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
                                         params,
                                       }: {
  params: Promise<{ episodeId: string }>;
}) {
  const episode = await client.fetch<SanityDocument>(POST_QUERY, await params, options);

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/cmsTest" className="hover:underline">
        ← Back to posts
      </Link>
      <h1 className="text-4xl font-bold mb-8">{episode.title}</h1>
      <div className="prose">
        <p>Published: {new Date(episode.air_date).toLocaleDateString()}</p>
        <div style={{whiteSpace: "pre"}}>{episode.script_text}</div>
      </div>
    </main>
  );
}