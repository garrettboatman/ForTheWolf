import {SanityCharacter, SanityEpisode} from "@/utils/sanity.types";

export interface Episode {
  id: number;
  title: string;
  link: string;
  duration: string;
  air_date: string;
  scribe?: string;
  alt_embed_src?: string;
  youtube_id?: string;
}

export type EpisodeWithHighlight = Episode & { highlight?: Record<string, string[]> | undefined};

export type SanityEpisodeWithHighlight = SanityEpisode & { highlight?: Record<string, string[]> | undefined };

export type SanityEpisodeCharacters = SanityEpisode & { characters_deref: SanityCharacter[] };
