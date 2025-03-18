import "@testing-library/jest-dom";
import {render, screen} from "@testing-library/react";

import CharacterSection from ".";
import {Character} from "../../models/character";

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: {},
    push: jest.fn(),
    pathname: "/",
  }),
}));

describe("CharacterSection", () => {
  test("renders CharacterSection component", async () => {
    const mockCharacters: Character[] = [
      {
        id: 1,
        name: "Rick Sanchez",
        status: "Alive",
        species: "Human",
        type: "",
        gender: "Male",
        origin: {
          name: "Earth (C-137)",
          url: "https://rickandmortyapi.com/api/location/1",
        },
        location: {
          name: "Citadel of Ricks",
          url: "https://rickandmortyapi.com/api/location/3",
        },
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        episode: ["https://rickandmortyapi.com/api/episode/1"],
        url: "https://rickandmortyapi.com/api/character/1",
        created: "2017-11-04T18:48:46.250Z",
      },
      {
        id: 2,
        name: "Morty Smith",
        status: "Alive",
        species: "Human",
        type: "",
        gender: "Male",
        origin: {
          name: "Earth (C-137)",
          url: "https://rickandmortyapi.com/api/location/1",
        },
        location: {
          name: "Earth (Replacement Dimension)",
          url: "https://rickandmortyapi.com/api/location/20",
        },
        image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
        episode: ["https://rickandmortyapi.com/api/episode/1"],
        url: "https://rickandmortyapi.com/api/character/2",
        created: "2017-11-04T18:50:21.651Z",
      },
    ];

    const mockProps = {
      title: "Characters",
      characters: mockCharacters,
      selectedCharacter: null,
      setSelectedCharacter: jest.fn(),
      loading: false,
      loadMore: jest.fn(),
      hasMore: true,
    };

    render(<CharacterSection {...mockProps} />);

    expect(await screen.findByText("Characters")).toBeInTheDocument();
    expect(await screen.findByText("Rick Sanchez")).toBeInTheDocument();
    expect(await screen.findByText("Morty Smith")).toBeInTheDocument();
  });
});
