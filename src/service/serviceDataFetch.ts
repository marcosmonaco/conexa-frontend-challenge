import {unstable_cache} from "next/cache";

import {Character} from "@/models/character";
import {Episode} from "@/models/episode";

/**
 * Trae todos los personajes de la API
 * @returns Promesa que contiene un array de objetos Character
 */
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

/**
 * Traigo todos los episodios de la API
 * @returns Promesa que contiene un array de objetos de episodios
 */
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

export const getAllCharacters = unstable_cache(
  fetchAllCharacters,
  ["rick-and-morty-characters"],
  {revalidate: 31 * 24 * 60 * 60} // 31 días en segundos
);

export const getAllEpisodes = unstable_cache(
  fetchAllEpisodes,
  ["rick-and-morty-episodes"],
  {revalidate: 31 * 24 * 60 * 60} // 31 días en segundos
);

/**
 * Extrae los IDs de episodios de una lista de URLs de episodios
 * @param urls Array de URLs de episodios
 * @returns Array de IDs de episodios como números
 */
export const getEpisodeIdsFromUrls = (urls: string[]): number[] => {
  return urls.map((url) => parseInt(url.split("/").pop() || "0", 10));
};
