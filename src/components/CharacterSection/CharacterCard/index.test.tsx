import "@testing-library/jest-dom";

import {render, screen, fireEvent} from "@testing-library/react";

import CharacterCard from ".";
import {Character} from "../../../models/character";
import {CharacterModalProps} from "./CharacterModal/types";

jest.mock("./CharacterModal", () => {
  return function MockCharacterModal({open, character}: CharacterModalProps) {
    if (!open) return null;
    return <div data-testid="character-modal">{character.name}</div>;
  };
});

jest.mock("lucide-react", () => ({
  Heart: () => <div data-testid="heart-icon">Heart</div>,
  Skull: () => <div data-testid="skull-icon">Skull</div>,
  HelpCircle: () => <div data-testid="help-icon">Help</div>,
}));

describe("CharacterCard", () => {
  const mockCharacter: Character = {
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
  };

  const mockProps = {
    character: mockCharacter,
    isSelected: false,
    onClick: jest.fn(),
  };

  test("renders character info correctly", () => {
    render(<CharacterCard {...mockProps} />);

    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Human")).toBeInTheDocument();
    expect(screen.getByText("View details")).toBeInTheDocument();
    expect(screen.getByAltText("Rick Sanchez")).toBeInTheDocument();
  });

  test("displays correct status icon for Alive character", () => {
    render(<CharacterCard {...mockProps} />);
    expect(screen.getByTestId("heart-icon")).toBeInTheDocument();
  });

  test("displays correct status icon for Dead character", () => {
    const deadCharacter = {
      ...mockCharacter,
      status: "Dead",
    };

    render(<CharacterCard {...mockProps} character={deadCharacter} />);
    expect(screen.getByTestId("skull-icon")).toBeInTheDocument();
  });

  test("displays correct status icon for unknown character", () => {
    const unknownCharacter = {
      ...mockCharacter,
      status: "unknown",
    };

    render(<CharacterCard {...mockProps} character={unknownCharacter} />);
    expect(screen.getByTestId("help-icon")).toBeInTheDocument();
  });

  test("calls onClick when card is clicked", () => {
    render(<CharacterCard {...mockProps} />);
    const card = screen.getByText("Rick Sanchez").closest("div");
    fireEvent.click(card as HTMLElement);
    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
  });

  test("opens modal when View details button is clicked", () => {
    render(<CharacterCard {...mockProps} />);

    expect(screen.queryByTestId("character-modal")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("View details"));

    expect(screen.getByTestId("character-modal")).toBeInTheDocument();
  });

  test("applies selected styling when isSelected is true", () => {
    const {rerender} = render(<CharacterCard {...mockProps} />);

    const card = screen.getByTestId("character-card");
    expect(card).toHaveClass("border-gray-700");
    expect(card).not.toHaveClass("border-RM-cyan-300");

    rerender(<CharacterCard {...mockProps} isSelected={true} />);

    expect(card).toHaveClass("border-RM-cyan-300");
    expect(card).not.toHaveClass("border-gray-700");
  });
});
