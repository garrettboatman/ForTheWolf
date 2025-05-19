import {SanityDocument} from "next-sanity";

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

// TODO: I think sanity can generate TS types for its documents...
export function sanityDocumentToEpisode(sanityDocument: SanityDocument): Episode {
  return {
    id: sanityDocument.episode_number,
    title: sanityDocument.title,
    link: sanityDocument.primary_video_link,
    duration: sanityDocument.duration,
    air_date: sanityDocument.air_date,
    scribe: sanityDocument.scribe,
    alt_embed_src: sanityDocument.alt_video_links && sanityDocument.alt_video_links.length > 0 ? sanityDocument.alt_video_links[0] : null,
  }
}
