import {useRef, useEffect} from "react";

import {Character} from "@/models/character";

import {CharacterSectionProps} from "./types";
import CharacterCard from "./CharacterCard";

export default function CharacterSection({
  // title,
  characters,
  selectedCharacter,
  setSelectedCharacter,
  loading,
  loadMore,
  hasMore,
}: CharacterSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleCharacterClick = (character: Character) => {
    // Si el personaje clickeado ya está seleccionado, lo deseleccionamos
    if (selectedCharacter?.id === character.id) {
      setSelectedCharacter(null);
    } else {
      // Si no está seleccionado o es otro personaje, lo seleccionamos
      setSelectedCharacter(character);
    }
  };

  // Detectar cuando el scroll llega casi al final para cargar más personajes
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const {scrollTop, scrollHeight, clientHeight} = container;

      // Cuando el usuario ha scrolleado hasta 100px desde el final
      if (
        scrollHeight - scrollTop - clientHeight < 100 &&
        !loading &&
        hasMore
      ) {
        loadMore();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, loadMore]);

  return (
    <div className="w-full bg-transparent border-2 border-RM-green-300 shadow-glow-green rounded-xl py-4 px-2">
      {/* <h2 className="text-xl font-semibold text-center py-4">{title}</h2> */}
      <div ref={scrollContainerRef} className="h-[300px] overflow-y-auto">
        <div className="flex flex-wrap gap-4 justify-center ">
          {characters.map((character) => (
            <div key={character.id} className="h-full">
              <CharacterCard
                character={character}
                isSelected={selectedCharacter?.id === character.id}
                onClick={() => handleCharacterClick(character)}
              />
            </div>
          ))}
        </div>
        {loading && (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-amber-600 border-t-transparent"></div>
          </div>
        )}
        {/* Si se llega al final de la lista */}
        {!hasMore && characters.length > 0 && (
          <div className="text-center py-4 text-gray-500 font-semibold">
            Thats it, no more characters to show!
          </div>
        )}
      </div>
    </div>
  );
}
