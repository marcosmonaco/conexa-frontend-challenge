import {Character} from "@/models/types";

export interface CharacterSectionProps {
  title: string;
  characters: Character[];
  selectedCharacter: Character | null;
  setSelectedCharacter: (character: Character | null) => void;
  loading: boolean;
  hasMore: boolean;
  loadMore: () => void;
}
