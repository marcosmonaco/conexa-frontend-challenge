import "driver.js/dist/driver.css";
import {useState, useEffect, useRef} from "react";
import {driver, Driver} from "driver.js";

import {UseTourResult} from "../components/Tour/types";
import {tourSteps} from "../components/Tour/steps";

export const useTour = (): UseTourResult => {
  const [isOpen, setIsOpen] = useState(false);
  const driverRef = useRef<Driver | null>(null);

  useEffect(() => {
    if (!driverRef.current) {
      driverRef.current = driver({
        animate: true,
        showProgress: true,
        steps: tourSteps,
        onDestroyStarted: () => {
          closeTour();
        },
        onDestroyed: () => {
          setIsOpen(false);
        },
      });
    }

    return () => {
      if (driverRef.current) {
        driverRef.current.destroy();
      }
    };
  }, []);

  const startTour = () => {
    setIsOpen(true);
    if (driverRef.current) {
      driverRef.current.drive();
    }
  };

  const closeTour = () => {
    if (driverRef.current) {
      driverRef.current.destroy();
    }
    setIsOpen(false);
  };

  return {
    isOpen,
    startTour,
    closeTour,
    driver: driverRef.current,
  };
};
