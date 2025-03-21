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

  const statusColor =
    {
      Alive: "bg-green-500",
      Dead: "bg-red-500",
      unknown: "bg-gray-500",
    }[character.status as "Alive" | "Dead" | "unknown"] || "bg-gray-500";

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
        className={`relative w-32 lg:w-52 cursor-pointer rounded-lg bg-gray-800 border-4 overflow-hidden shadow-md transition-all hover:shadow-lg duration-400 flex flex-col items-center ${
          isSelected ? "border-RM-cyan-300" : "border-gray-700"
        }`}
        data-testid="character-card"
      >
        <div className="relative mt-6">
          <div className="relative">
            {isSelected && (
              <div className="absolute inset-0 rounded-full border-4 border-RM-green-300 shadow-glow-green animate-pulse"></div>
            )}

            <img
              src={character.image}
              alt={character.name}
              className="relative h-20 w-20 lg:h-32 lg:w-32 rounded-full border-4 border-RM-green-300 transition-all duration-500 object-cover z-10"
            />
          </div>

          <div
            className={`absolute bottom-1 right-1 lg:right-2 h-6 w-6 lg:h-7 lg:w-7 rounded-full border-2 border-gray-800 ${statusColor} flex items-center justify-center z-20`}
          >
            <StatusIcon size={14} className={`${iconColor}`} />
          </div>
        </div>

        <div className="w-full px-1 lg:px-4 pt-4 pb-6 flex flex-col items-center gap-2">
          <h3 className="text-sm lg:text-lg font-semibold text-RM-cyan-300 text-center  line-clamp-1">
            {character.name}
          </h3>

          <p className="text-xs lg:text-sm font-bold text-white">
            {character.species}
          </p>

          <button
            onClick={handleModalOpen}
            className="bg-RM-cyan-400 hover:bg-RM-cyan-500 px-4 py-1.5 rounded-lg text-white text-sm font-semibold transition-colors"
            id="view-details"
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
