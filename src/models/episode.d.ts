export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface EpisodeSectionProps {
  title: string;
  episodes: Episode[];
  isSelected: boolean;
  emptyMessage?: string;
  characters: string;
}
