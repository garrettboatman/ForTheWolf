import Link from "next/link";

export default function EpisodeDetailsLayout({children}: {children: React.ReactNode}) {
  return (
    <div className="p-8">
      <div className="mb-2"><Link href={"/"}>Home</Link></div>
      <div>
        {children}
      </div>
    </div>
  )
}