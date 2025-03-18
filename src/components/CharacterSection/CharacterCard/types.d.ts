import {Character} from "@/lib/api";

interface CharacterCardProps {
  character: Character;
  isSelected: boolean;
  onClick: () => void;
}
