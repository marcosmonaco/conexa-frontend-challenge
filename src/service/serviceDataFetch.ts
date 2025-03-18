import {unstable_cache} from "next/cache";

import {Character} from "@/models/character";
import {Episode} from "@/models/episode";

// Función para obtener todos los personajes de la API
async function fetchAllCharacters(): Promise<Character[]> {
  let allCharacters: Character[] = [];
  let nextPage = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${nextPage}`
    );
    const data = await response.json();

    allCharacters = [...allCharacters, ...data.results];
    hasMore = data.info.next !== null;
    nextPage++;
  }

  return allCharacters;
}

// Función para obtener todos los episodios de la API
async function fetchAllEpisodes(): Promise<Episode[]> {
  let allEpisodes: Episode[] = [];
  let nextPage = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(
      `https://rickandmortyapi.com/api/episode/?page=${nextPage}`
    );
    const data = await response.json();

    allEpisodes = [...allEpisodes, ...data.results];
    hasMore = data.info.next !== null;
    nextPage++;
  }

  return allEpisodes;
}

// Cachear la función de personajes por 31 días (en segundos)
export const getAllCharacters = unstable_cache(
  fetchAllCharacters,
  ["rick-and-morty-characters"],
  {revalidate: 31 * 24 * 60 * 60} // 31 días en segundos
);

// Cachear la función de episodios por 31 días (en segundos)
export const getAllEpisodes = unstable_cache(
  fetchAllEpisodes,
  ["rick-and-morty-episodes"],
  {revalidate: 31 * 24 * 60 * 60} // 31 días en segundos
);

// Función para obtener episodios por IDs
export const getEpisodesByIds = (
  allEpisodes: Episode[],
  ids: number[]
): Episode[] => {
  return allEpisodes.filter((episode) => ids.includes(episode.id));
};

// Función para extraer IDs de episodios desde las URLs
export const getEpisodeIdsFromUrls = (urls: string[]): number[] => {
  return urls.map((url) => parseInt(url.split("/").pop() || "0", 10));
};
