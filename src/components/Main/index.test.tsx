import React from "react";

import "@testing-library/jest-dom";
import {render, screen, fireEvent} from "@testing-library/react";

import MainPage from ".";
import {Character} from "../../models/character";
import {Episode, EpisodeSectionProps} from "../../models/episode";
import {CharacterSectionProps} from "../CharacterSection/types";

const mockCharacters: Character[] = [
  {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: {
      name: "Earth",
      url: "https://example.com",
    },
    location: {
      name: "Earth",
      url: "https://example.com",
    },
    image: "https://example.com/rick.png",
    episode: ["https://example.com/episode/1"],
    url: "https://example.com/character/1",
    created: "2021-01-01",
  },
];

const mockEpisodesChar1: Episode[] = [
  {
    id: 1,
    name: "Pilot",
    air_date: "2013-12-02",
    episode: "S01E01",
    characters: ["https://example.com/character/1"],
    url: "https://example.com/episode/1",
    created: "2021-01-01",
  },
];

const mockEpisodesChar2: Episode[] = [
  {
    id: 2,
    name: "Episode 2",
    air_date: "2013-12-09",
    episode: "S01E02",
    characters: ["https://example.com/character/2"],
    url: "https://example.com/episode/2",
    created: "2021-01-01",
  },
];

const mockSharedEpisodes: Episode[] = [
  {
    id: 3,
    name: "Shared Episode",
    air_date: "2013-12-16",
    episode: "S01E03",
    characters: [
      "https://example.com/character/1",
      "https://example.com/character/2",
    ],
    url: "https://example.com/episode/3",
    created: "2021-01-01",
  },
];

const mockUseEpisodeComparison = jest.fn().mockReturnValue({
  episodesChar1: mockEpisodesChar1,
  episodesChar2: mockEpisodesChar2,
  sharedEpisodes: mockSharedEpisodes,
  loading: false,
});

jest.mock("../../hooks/useLocalCharacterPagination", () => ({
  useCharacterPagination: () => ({
    characters: mockCharacters,
    loading: false,
    hasMore: true,
    loadMore: jest.fn(),
  }),
}));

jest.mock("../../hooks/useLocalEpisodeComparison", () => ({
  useEpisodeComparison: (char1: Character | null, char2: Character | null) =>
    mockUseEpisodeComparison(char1, char2),
}));

jest.mock("../CharacterSection", () => {
  return function MockCharacterSection({
    title,
    setSelectedCharacter,
  }: CharacterSectionProps) {
    return (
      <div data-testid={`character-section-${title}`}>
        <h2>{title}</h2>
        <button
          onClick={() => setSelectedCharacter(mockCharacters[0])}
          data-testid={`select-character-${title}`}
        >
          Select Character
        </button>
      </div>
    );
  };
});

jest.mock("../EpisodeSection", () => {
  return function MockEpisodeSection({
    title,
    episodes,
    characters,
    isSelected,
  }: EpisodeSectionProps) {
    const testId = characters
      ? `episode-section-${title}-${characters.replace(/\s/g, "-")}`
      : `episode-section-${title}`;

    if (!isSelected) {
      return <div data-testid={testId}>Not selected</div>;
    }
    return (
      <div data-testid={testId}>
        <h2>{title}</h2>
        <p>{characters}</p>
        <p>Episodes: {episodes.length}</p>
      </div>
    );
  };
});
jest.mock("../Loader", () => {
  return function MockLoader() {
    return <div data-testid="loader">Loading...</div>;
  };
});

describe("MainPage", () => {
  const defaultProps = {
    initialCharacters: mockCharacters,
    allEpisodes: [
      ...mockEpisodesChar1,
      ...mockEpisodesChar2,
      ...mockSharedEpisodes,
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseEpisodeComparison.mockReturnValue({
      episodesChar1: mockEpisodesChar1,
      episodesChar2: mockEpisodesChar2,
      sharedEpisodes: mockSharedEpisodes,
      loading: false,
    });
  });

  test("renders CharacterSection components", () => {
    render(<MainPage {...defaultProps} />);

    expect(
      screen.getByTestId("character-section-Character #1")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("character-section-Character #2")
    ).toBeInTheDocument();
  });

  test("shows loader when episodes are loading", () => {
    mockUseEpisodeComparison.mockReturnValue({
      episodesChar1: [],
      episodesChar2: [],
      sharedEpisodes: [],
      loading: true,
    });

    render(<MainPage {...defaultProps} />);

    fireEvent.click(screen.getByTestId("select-character-Character #1"));

    expect(screen.getByTestId("loader")).toBeInTheDocument();

    expect(
      screen.queryByTestId("episode-section-Exclusive Episodes")
    ).not.toBeInTheDocument();
  });
});
