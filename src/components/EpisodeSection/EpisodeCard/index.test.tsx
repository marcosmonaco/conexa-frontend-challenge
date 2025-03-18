import React from "react";

import "@testing-library/jest-dom";
import {render, screen} from "@testing-library/react";
import {Episode} from "@/models/episode";

import EpisodeCard from ".";

describe("EpisodeCard", () => {
  const mockEpisode: Episode = {
    id: 1,
    name: "Pilot",
    air_date: "December 2, 2013",
    episode: "S01E01",
    characters: ["https://rickandmortyapi.com/api/character/1"],
    url: "https://rickandmortyapi.com/api/episode/1",
    created: "2017-11-10T12:56:33.798Z",
  };

  test("renders episode information correctly", () => {
    render(<EpisodeCard episode={mockEpisode} />);

    expect(screen.getByText("Pilot - S01E01")).toBeInTheDocument();

    expect(screen.getByText("December 2, 2013")).toBeInTheDocument();
  });

  test("has correct styling", () => {
    const {container} = render(<EpisodeCard episode={mockEpisode} />);

    const cardElement = container.firstChild as HTMLElement;
    expect(cardElement).toHaveClass("bg-white", "dark:bg-gray-800");
    expect(cardElement).toHaveClass("rounded-lg");
    expect(cardElement).toHaveClass("border-4");
    expect(cardElement).toHaveClass("border-gray-700");
  });

  test("handles long episode names", () => {
    const longNameEpisode = {
      ...mockEpisode,
      name: "This is an extremely long episode name that might cause layout issues if not handled properly",
    };

    const {container} = render(<EpisodeCard episode={longNameEpisode} />);

    expect(container.firstChild).toBeInTheDocument();

    expect(
      screen.getByText(`${longNameEpisode.name} - S01E01`)
    ).toBeInTheDocument();
  });

  test("handles missing air date", () => {
    const noAirDateEpisode = {
      ...mockEpisode,
      air_date: "",
    };

    render(<EpisodeCard episode={noAirDateEpisode} />);

    expect(screen.queryByText(mockEpisode.air_date)).not.toBeInTheDocument();
  });
});
