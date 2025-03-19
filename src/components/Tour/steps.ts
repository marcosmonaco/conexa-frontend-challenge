import {DriveStep} from "driver.js";

export const tourSteps: DriveStep[] = [
  {
    element: "#tour-container",
    popover: {
      title: "Welcome to the tour!",
      description:
        "This tour will guide you through the main features of the page.",
      nextBtnText: "Next",
    },
  },
  {
    element: "#tour-character-section-1",
    popover: {
      title: "Character Selection #1",
      description:
        "Browse and select your first character here. You can scroll down to load more characters.",
      nextBtnText: "Next",
      prevBtnText: "Previous",
    },
  },
  {
    element: "#tour-character-section-2",
    popover: {
      title: "Character Selection #2",
      description:
        "Browse and select your second character here. You can also scroll down to load more characters.",
      nextBtnText: "Next",
      prevBtnText: "Previous",
    },
  },
  {
    element: "#status-filter",
    popover: {
      title: "Status filter",
      description:
        "In here you can filter the characters displayed according to their status.",
      nextBtnText: "Next",
      prevBtnText: "Previous",
    },
  },
  {
    element: "#view-details",
    popover: {
      title: "View Details",
      description:
        "You can click here to see more information about each character.",
      nextBtnText: "Next",
      prevBtnText: "Previous",
    },
  },
  {
    element: "#tour-episode-exclusive-1",
    popover: {
      title: "Exclusive Episodes",
      description:
        "After selecting Character #1, this section displays episodes where only this character appears.",
      nextBtnText: "Next",
      prevBtnText: "Previous",
    },
  },
  {
    element: "#tour-episode-shared",
    popover: {
      title: "Shared Episodes",
      description:
        "After selecting both characters, this section shows episodes where both characters appear together.",
      nextBtnText: "Next",
      prevBtnText: "Previous",
    },
  },
  {
    element: "#tour-episode-exclusive-2",
    popover: {
      title: "Exclusive Episodes",
      description:
        "After selecting Character #2, this section displays episodes where only this character appears.",
      nextBtnText: "Finish",
      prevBtnText: "Previous",
    },
  },
];
