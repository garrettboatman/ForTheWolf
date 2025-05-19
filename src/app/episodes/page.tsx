import {fetchAllEpisodesWithoutScripts} from "@/utils/episodeData";
import AllEpisodesTable from "@/components/AllEpisodesTable";
import Link from "next/link";

export default function AllEpisodesPage() {
  const episodes = fetchAllEpisodesWithoutScripts();
  return (
    <div className="p-4 space-y-4">
      <Link href={"/"}>{"<"} Home</Link>
    <AllEpisodesTable episodes={episodes}/>
    </div>
  )
}