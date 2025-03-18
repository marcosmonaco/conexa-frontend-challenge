import {EpisodeSectionProps} from "@/models/episode";

import EpisodeCard from "./EpisodeCard";

export default function EpisodeSection({
  title,
  episodes,
  isSelected,
  characters,
  emptyMessage = "Select a character to see their episodes",
}: EpisodeSectionProps) {
  return (
    <div className="pb-5 bg-gray-800 border-4 border-RM-cyan-300 shadow-glow-cyan rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-1 text-RM-cyan-300 text-center">
        {title}
      </h2>
      <h2 className="text-lg font-semibold mb-2 text-RM-cyan-300 text-center">
        {characters}
      </h2>
      {!isSelected ? (
        <p className="text-gray-500 text-center font-semibold">
          {emptyMessage}
        </p>
      ) : episodes.length === 0 ? (
        <p className="text-gray-500 text-center font-semibold">
          No exclusive episodes found
        </p>
      ) : (
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-gray-800 to-transparent z-10" />

          <div className="h-32 lg:h-56 overflow-y-auto pr-2 flex flex-col gap-2 py-2">
            {episodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>

          <div className="absolute bottom-0 left-0 right-3 h-8 bg-gradient-to-t from-gray-800 to-transparent z-10" />
        </div>
      )}
    </div>
  );
}
