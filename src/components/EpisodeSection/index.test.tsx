import React from "react";

import "@testing-library/jest-dom";
import {render, screen} from "@testing-library/react";
import {Episode} from "@/models/episode";

import EpisodeSection from ".";

jest.mock("./EpisodeCard", () => {
  return function MockEpisodeCard({episode}: {episode: Episode}) {
    return <div data-testid={`episode-card-${episode.id}`}>{episode.name}</div>;
  };
});

describe("EpisodeSection", () => {
  const mockEpisodes: Episode[] = [
    {
      id: 1,
      name: "Pilot",
      air_date: "December 2, 2013",
      episode: "S01E01",
      characters: ["https://rickandmortyapi.com/api/character/1"],
      url: "https://rickandmortyapi.com/api/episode/1",
      created: "2017-11-10T12:56:33.798Z",
    },
    {
      id: 2,
      name: "Lawnmower Dog",
      air_date: "December 9, 2013",
      episode: "S01E02",
      characters: ["https://rickandmortyapi.com/api/character/1"],
      url: "https://rickandmortyapi.com/api/episode/2",
      created: "2017-11-10T12:56:33.916Z",
    },
  ];

  test("renders title and character name correctly", () => {
    render(
      <EpisodeSection
        title="Episodes"
        episodes={mockEpisodes}
        isSelected={true}
        characters="Rick Sanchez"
      />
    );

    expect(screen.getByText("Episodes")).toBeInTheDocument();
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
  });

  test("shows empty message when no character is selected", () => {
    render(
      <EpisodeSection
        title="Episodes"
        episodes={[]}
        isSelected={false}
        characters=""
      />
    );

    expect(
      screen.getByText("Select a character to see their episodes")
    ).toBeInTheDocument();
  });

  test("shows custom empty message when provided", () => {
    render(
      <EpisodeSection
        title="Episodes"
        episodes={[]}
        isSelected={false}
        characters=""
        emptyMessage="Custom empty message"
      />
    );

    expect(screen.getByText("Custom empty message")).toBeInTheDocument();
  });

  test("shows 'No exclusive episodes found' when character is selected but has no episodes", () => {
    render(
      <EpisodeSection
        title="Episodes"
        episodes={[]}
        isSelected={true}
        characters="Rick Sanchez"
      />
    );

    expect(screen.getByText("No exclusive episodes found")).toBeInTheDocument();
  });

  test("renders episode cards when episodes are available", () => {
    render(
      <EpisodeSection
        title="Episodes"
        episodes={mockEpisodes}
        isSelected={true}
        characters="Rick Sanchez"
      />
    );

    expect(screen.getByText("Pilot")).toBeInTheDocument();
    expect(screen.getByText("Lawnmower Dog")).toBeInTheDocument();
    expect(screen.getByTestId("episode-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("episode-card-2")).toBeInTheDocument();
  });

  test("applies correct styles to container", () => {
    const {container} = render(
      <EpisodeSection
        title="Episodes"
        episodes={mockEpisodes}
        isSelected={true}
        characters="Rick Sanchez"
      />
    );

    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv).toHaveClass("border-RM-cyan-300");
    expect(mainDiv).toHaveClass("shadow-glow-cyan");
    expect(mainDiv).toHaveClass("rounded-lg");
  });
});
