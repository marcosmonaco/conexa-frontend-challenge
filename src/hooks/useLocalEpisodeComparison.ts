import {useState, useEffect} from "react";

import {Character} from "@/models/character";
import {Episode} from "@/models/episode";
import {getEpisodeIdsFromUrls} from "@/service/serviceDataFetch";

export function useEpisodeComparison(
  character1: Character | null,
  character2: Character | null,
  allEpisodes: Episode[]
) {
  const [episodesChar1, setEpisodesChar1] = useState<Episode[]>([]);
  const [episodesChar2, setEpisodesChar2] = useState<Episode[]>([]);
  const [sharedEpisodes, setSharedEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!character1 && !character2) {
      setEpisodesChar1([]);
      setEpisodesChar2([]);
      setSharedEpisodes([]);
      return;
    }

    setLoading(true);

    // Simular un pequeño retraso para mostrar el estado de carga
    setTimeout(() => {
      // Obtener IDs de los episodios
      const char1EpisodeIds = character1
        ? getEpisodeIdsFromUrls(character1.episode)
        : [];
      const char2EpisodeIds = character2
        ? getEpisodeIdsFromUrls(character2.episode)
        : [];

      // Calcular episodios exclusivos y compartidos
      if (character1 && character2) {
        const char1OnlyIds = char1EpisodeIds.filter(
          (id) => !char2EpisodeIds.includes(id)
        );
        const char2OnlyIds = char2EpisodeIds.filter(
          (id) => !char1EpisodeIds.includes(id)
        );
        const sharedIds = char1EpisodeIds.filter((id) =>
          char2EpisodeIds.includes(id)
        );

        // Obtener los episodios a partir de los IDs
        setEpisodesChar1(
          allEpisodes.filter((ep) => char1OnlyIds.includes(ep.id))
        );
        setEpisodesChar2(
          allEpisodes.filter((ep) => char2OnlyIds.includes(ep.id))
        );
        setSharedEpisodes(
          allEpisodes.filter((ep) => sharedIds.includes(ep.id))
        );
      } else if (character1) {
        setEpisodesChar1(
          allEpisodes.filter((ep) => char1EpisodeIds.includes(ep.id))
        );
        setEpisodesChar2([]);
        setSharedEpisodes([]);
      } else if (character2) {
        setEpisodesChar1([]);
        setEpisodesChar2(
          allEpisodes.filter((ep) => char2EpisodeIds.includes(ep.id))
        );
        setSharedEpisodes([]);
      }

      setLoading(false);
    }, 500);
  }, [character1, character2, allEpisodes]);

  return {episodesChar1, episodesChar2, sharedEpisodes, loading};
}
