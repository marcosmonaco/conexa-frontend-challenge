import {useState, useCallback, useEffect} from "react";

import {Character} from "@/models/character";

export function useCharacterPagination(
  allCharacters: Character[],
  pageSize = 20
) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Cargar una página específica de personajes
  const loadPage = useCallback(
    (page: number) => {
      setLoading(true);

      // Simular un retraso para que se vea el spinner
      setTimeout(() => {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const newCharacters = allCharacters.slice(0, endIndex);

        setCharacters(newCharacters);
        setHasMore(endIndex < allCharacters.length);
        setLoading(false);
      }, 300);
    },
    [allCharacters, pageSize]
  );

  // Inicializar con la primera página
  useEffect(() => {
    loadPage(1);
  }, [loadPage]);

  // Función para cargar más personajes
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      loadPage(nextPage);
    }
  }, [currentPage, hasMore, loading, loadPage]);

  return {
    characters,
    loading,
    hasMore,
    loadMore,
  };
}
