export interface CharacterModalProps {
  open: boolean;
  onHide: () => void;
  character: Character | null;
}
