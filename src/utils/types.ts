export interface Episode {
  id: number;
  title: string;
  link: string;
  script: string;
  duration: string;
  air_date: string;
  scribe?: string;
  alt_embed_src?: string;
  youtube_id?: string;
}
