"use client";

import {useState} from "react";

import {useCharacterPagination} from "@/hooks/useLocalCharacterPagination";
import {useEpisodeComparison} from "@/hooks/useLocalEpisodeComparison";
import CharacterSection from "@/components/CharacterSection";
import EpisodeSection from "@/components/EpisodeSection";
import {Character} from "@/models/character";

import {MainPageProps} from "./types";
import Loader from "../Loader";

export default function MainPage({
  initialCharacters,
  allEpisodes,
}: MainPageProps) {
  const [selectedCharacter1, setSelectedCharacter1] =
    useState<Character | null>(null);
  const [selectedCharacter2, setSelectedCharacter2] =
    useState<Character | null>(null);

  // Hooks personalizados para paginar los personajes
  const {
    characters: chars1,
    loading: loading1,
    hasMore: hasMore1,
    loadMore: loadMore1,
  } = useCharacterPagination(initialCharacters);

  const {
    characters: chars2,
    loading: loading2,
    hasMore: hasMore2,
    loadMore: loadMore2,
  } = useCharacterPagination(initialCharacters);

  // Hook para comparar episodios
  const {episodesChar1, episodesChar2, sharedEpisodes, loading} =
    useEpisodeComparison(selectedCharacter1, selectedCharacter2, allEpisodes);

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <CharacterSection
          title="Character #1"
          characters={chars1}
          selectedCharacter={selectedCharacter1}
          setSelectedCharacter={setSelectedCharacter1}
          loading={loading1}
          hasMore={hasMore1}
          loadMore={loadMore1}
        />

        <CharacterSection
          title="Character #2"
          characters={chars2}
          selectedCharacter={selectedCharacter2}
          setSelectedCharacter={setSelectedCharacter2}
          loading={loading2}
          hasMore={hasMore2}
          loadMore={loadMore2}
        />
      </div>

      {loading && (selectedCharacter1 || selectedCharacter2) ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <EpisodeSection
            title="Exclusive Episodes"
            episodes={episodesChar1}
            characters={`${selectedCharacter1?.name || "Character #1"} `}
            isSelected={!!selectedCharacter1}
          />

          <EpisodeSection
            title="Shared Episodes"
            episodes={sharedEpisodes}
            characters={`${selectedCharacter1?.name || "Character #1"} & ${
              selectedCharacter2?.name || "Character #2"
            }`}
            isSelected={!!selectedCharacter1 && !!selectedCharacter2}
            emptyMessage="Select both characters to see shared episodes"
          />

          <EpisodeSection
            title="Exclusive Episodes"
            episodes={episodesChar2}
            characters={`${selectedCharacter2?.name || "Character #2"}`}
            isSelected={!!selectedCharacter2}
          />
        </div>
      )}
    </div>
  );
}
