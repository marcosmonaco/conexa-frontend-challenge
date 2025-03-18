/* eslint-disable @next/next/no-img-element */

import {useState} from "react";
import {Heart, Skull, HelpCircle} from "lucide-react";

import {CharacterCardProps} from "./types";
import CharacterModal from "./CharacterModal";

export default function CharacterCard({
  character,
  isSelected,
  onClick,
}: CharacterCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Configuración de colores según el estado
  const statusColor =
    {
      Alive: "bg-green-500",
      Dead: "bg-red-500",
      unknown: "bg-gray-500",
    }[character.status as "Alive" | "Dead" | "unknown"] || "bg-gray-500";

  // Configuración de iconos según el estado
  const StatusIcon =
    {
      Alive: Heart,
      Dead: Skull,
      unknown: HelpCircle,
    }[character.status as "Alive" | "Dead" | "unknown"] || HelpCircle;

  const iconColor =
    {
      Alive: "text-white",
      Dead: "text-black",
      unknown: "text-white",
    }[character.status as "Alive" | "Dead" | "unknown"] || "text-gray-500";

  const handleModalOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        onClick={onClick}
        className={`relative w-52 cursor-pointer rounded-lg bg-gray-800 border-4 overflow-hidden shadow-md transition-all hover:shadow-lg duration-400 flex flex-col items-center ${
          isSelected ? "border-RM-cyan-300" : "border-gray-700"
        }`}
      >
        <div className="relative mt-6">
          <img
            src={character.image}
            alt={character.name}
            className={`h-32 w-32 rounded-full border-4 border-RM-green-300 transition-all duration-500 ${
              isSelected ? "shadow-glow-green" : ""
            } object-cover`}
          />

          {/* Indicador de Status*/}
          <div
            className={`absolute bottom-1 right-2 h-7 w-7 rounded-full border-2 border-gray-800 ${statusColor} flex items-center justify-center`}
          >
            <StatusIcon size={14} className={`${iconColor}`} />
          </div>
        </div>

        {/* Debajo de la imagen */}
        <div className="w-full px-4 pt-4 pb-6 flex flex-col items-center gap-2">
          <h3 className="text-lg font-semibold text-RM-cyan-300 text-center  line-clamp-1">
            {character.name}
          </h3>

          <p className="text-sm font-bold text-white">{character.species}</p>

          <button
            onClick={handleModalOpen}
            className="bg-RM-cyan-400 hover:bg-RM-cyan-500 px-4 py-1.5 rounded-lg text-white text-sm font-semibold transition-colors"
          >
            View details
          </button>
        </div>
      </div>

      <CharacterModal
        open={isModalOpen}
        onHide={() => setIsModalOpen(false)}
        character={character}
      />
    </>
  );
}
