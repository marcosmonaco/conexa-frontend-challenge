import {EpisodeCardProps} from "./types";

export default function EpisodeCard({episode}: EpisodeCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border-4 border-gray-700">
      <h3 className="text-lg font-semibold">
        {episode.name} - {episode.episode}
      </h3>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        Air date: {episode.air_date}
      </p>
    </div>
  );
}
