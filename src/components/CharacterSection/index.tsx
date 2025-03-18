import {useState, useRef, useEffect} from "react";

import {Character} from "@/models/character";
import {StatusFilter} from "@/models/status";

import {CharacterSectionProps} from "./types";
import CharacterCard from "./CharacterCard";
import Loader from "../Loader";
import StatusFilters from "../StatusFilter";

export default function CharacterSection({
  title,
  characters,
  selectedCharacter,
  setSelectedCharacter,
  loading,
  loadMore,
  hasMore,
}: CharacterSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Estado para los filtros de status
  const [statusFilter, setStatusFilter] = useState<StatusFilter>({
    alive: true,
    dead: true,
    unknown: true,
  });

  // Verificar si todos los filtros están desactivados
  const allFiltersOff = !Object.values(statusFilter).some((value) => value);

  // Filtrar personajes según los filtros seleccionados
  const filteredCharacters = characters.filter((character) => {
    // Si todos los filtros están desactivados, no mostrar ninguno
    if (allFiltersOff) return false;

    const status = character.status.toLowerCase() as keyof StatusFilter;
    return statusFilter[status];
  });

  const handleCharacterClick = (character: Character) => {
    // Si el personaje clickeado ya está seleccionado, lo deseleccionamos
    if (selectedCharacter?.id === character.id) {
      setSelectedCharacter(null);
    } else {
      // Si no está seleccionado o es otro personaje, lo seleccionamos
      setSelectedCharacter(character);
    }
  };

  const handleFilterChange = (status: string | number | symbol) => {
    const filterKey = status as keyof StatusFilter;
    setStatusFilter((prev) => ({
      ...prev,
      [filterKey]: !prev[filterKey],
    }));
  };

  // Detectar cuando el scroll llega casi al final para cargar más characters
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const {scrollTop, scrollHeight, clientHeight} = container;

      // Cuando el usuario scrolleo a 100px del final
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
    <div className="w-full bg-transparent border-2 border-RM-green-300 shadow-glow-green rounded-xl pt-4 px-2">
      {/* Filtros de status con checkboxes personalizados */}
      <h3 className="text-lg font-semibold text-white text-center pb-2">
        {title}
      </h3>
      <StatusFilters
        statusFilter={statusFilter}
        onChange={handleFilterChange}
      />

      <div ref={scrollContainerRef} className="h-64 xl:h-96 overflow-y-auto">
        <div className="flex flex-wrap gap-4 justify-center">
          {filteredCharacters.map((character) => (
            <div key={character.id} className="h-full">
              <CharacterCard
                character={character}
                isSelected={selectedCharacter?.id === character.id}
                onClick={() => handleCharacterClick(character)}
              />
            </div>
          ))}
        </div>

        {/* Área de mensajes combinada */}
        <div className="text-center py-8">
          {loading ? (
            // Mensaje de carga
            <div className="flex flex-col items-center justify-center">
              <Loader />
            </div>
          ) : filteredCharacters.length === 0 ? (
            // No hay resultados
            <div className="text-gray-400">
              {allFiltersOff
                ? "Please select at least one filter."
                : "No characters found with the selected filters."}
            </div>
          ) : !hasMore && characters.length > 0 ? (
            // No hay más personajes
            <div className="text-gray-500 font-semibold">
              You are done, no more characters to show!
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
