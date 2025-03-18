import React from "react";

import "@testing-library/jest-dom";
import {render, screen} from "@testing-library/react";

import Loader from ".";

describe("Loader", () => {
  test("renders loader component", () => {
    render(<Loader />);

    const loaderImage = screen.getByAltText("Loading");
    expect(loaderImage).toBeInTheDocument();
  });

  test("has correct image source", () => {
    render(<Loader />);

    const loaderImage = screen.getByAltText("Loading");
    expect(loaderImage).toHaveAttribute("src", "/images/portal.png");
  });

  test("has animation styles applied", () => {
    render(<Loader />);

    const loaderImage = screen.getByAltText("Loading");
    expect(loaderImage).toHaveClass("animate-spin");

    expect(loaderImage).toHaveStyle("animation: spin 1.5s linear infinite");
  });

  test("has correct sizing", () => {
    render(<Loader />);

    const loaderImage = screen.getByAltText("Loading");
    expect(loaderImage).toHaveClass("w-32", "h-32");
  });

  test("is centered in container", () => {
    const {container} = render(<Loader />);

    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv).toHaveClass(
      "flex",
      "flex-col",
      "items-center",
      "justify-center"
    );
  });
});
