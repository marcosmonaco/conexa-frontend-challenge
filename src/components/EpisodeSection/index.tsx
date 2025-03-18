import {EpisodeSectionProps} from "@/models/episode";

import EpisodeCard from "./EpisodeCard";

export default function EpisodeSection({
  title,
  episodes,
  isSelected,
  emptyMessage = "Select a character to see their episodes",
}: EpisodeSectionProps) {
  return (
    <div className="pb-5">
      <h2 className="text-xl font-semibold mb-4 text-RM-cyan-300">{title}</h2>
      {!isSelected ? (
        <p className="text-gray-500">{emptyMessage}</p>
      ) : episodes.length === 0 ? (
        <p className="text-gray-500">No exclusive episodes found</p>
      ) : (
        <div className="h-52 overflow-y-auto pr-2 ">
          {episodes.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
        </div>
      )}
    </div>
  );
}
