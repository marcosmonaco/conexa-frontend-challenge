import {Driver} from "driver.js";

export interface TourProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface UseTourResult {
  isOpen: boolean;
  startTour: () => void;
  closeTour: () => void;
  driver: Driver | null;
}
