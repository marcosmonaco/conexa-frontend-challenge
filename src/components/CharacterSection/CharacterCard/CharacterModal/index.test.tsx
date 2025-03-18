import React from "react";
import "@testing-library/jest-dom";

import {render, screen, fireEvent} from "@testing-library/react";

import CharacterModal from ".";
import {Character} from "../../../../models/character";

describe("CharacterModal", () => {
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
    open: true,
    onHide: jest.fn(),
    character: mockCharacter,
  };

  test("does not render when open is false", () => {
    render(<CharacterModal {...mockProps} open={false} />);
    expect(
      screen.queryByTestId("character-modal-container")
    ).not.toBeInTheDocument();
  });

  test("does not render when character is null", () => {
    render(<CharacterModal {...mockProps} character={null} />);
    expect(
      screen.queryByTestId("character-modal-container")
    ).not.toBeInTheDocument();
  });

  test("renders when open is true and character is provided", () => {
    render(<CharacterModal {...mockProps} />);
    expect(screen.getByTestId("character-modal-container")).toBeInTheDocument();
    expect(screen.getByTestId("character-modal-content")).toBeInTheDocument();
  });

  test("displays character information correctly", () => {
    render(<CharacterModal {...mockProps} />);

    expect(screen.getByTestId("character-modal-name")).toHaveTextContent(
      "Rick Sanchez"
    );
    expect(screen.getByTestId("character-modal-status")).toHaveTextContent(
      "Status: Alive"
    );
    expect(screen.getByTestId("character-modal-species")).toHaveTextContent(
      "Species: Human"
    );
    expect(screen.getByTestId("character-modal-gender")).toHaveTextContent(
      "Gender: Male"
    );
    expect(screen.getByTestId("character-modal-origin")).toHaveTextContent(
      "Origin: Earth (C-137)"
    );
    expect(screen.getByTestId("character-modal-location")).toHaveTextContent(
      "Location: Citadel of Ricks"
    );

    const img = screen.getByTestId("character-modal-image");
    expect(img).toHaveAttribute("src", mockCharacter.image);
    expect(img).toHaveAttribute("alt", mockCharacter.name);
  });

  test("calls onHide when close button is clicked", () => {
    render(<CharacterModal {...mockProps} />);

    fireEvent.click(screen.getByTestId("character-modal-close-btn"));
    expect(mockProps.onHide).toHaveBeenCalledTimes(1);

    mockProps.onHide.mockClear();

    fireEvent.click(screen.getByTestId("character-modal-footer-close-btn"));
    expect(mockProps.onHide).toHaveBeenCalledTimes(1);
  });

  test("calls onHide when clicking on backdrop", () => {
    render(<CharacterModal {...mockProps} />);

    fireEvent.click(screen.getByTestId("character-modal-backdrop"));
    expect(mockProps.onHide).toHaveBeenCalled();
  });
});
