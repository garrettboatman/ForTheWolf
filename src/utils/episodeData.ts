import {Episode} from "@/utils/types";
import path from "path";
import fs from "fs";

/**
 * *MUST* be called from the server side! This won't work in any files
 * decorated with `"use client"`
 */
export function fetchAllEpisodes(): Episode[] {
  const filePath = path.join(process.cwd(), "public", "jnapi-episodes.json");
  const fileData = fs.readFileSync(filePath, "utf8");
  const episodes: Episode[] = JSON.parse(fileData).data;
  return episodes;
}

/**
 * *MUST* be called from the server side! This won't work in any files
 * decorated with `"use client"`
 */
export function fetchAllEpisodesWithoutScripts(): Episode[] {
  const filePath = path.join(process.cwd(), "public", "jnapi-episodes.json");
  const fileData = fs.readFileSync(filePath, "utf8");
  const episodes = JSON.parse(fileData).data;
  return episodes.map((episode: Episode & {script?: string}) => {
    const epCopy = {...episode};
    delete epCopy["script"];
    return epCopy;
  })
}
