import Image from "next/image";

import {AnimatedTourButtonProps} from "./types";

export default function AnimatedTourButton({onClick}: AnimatedTourButtonProps) {
  return (
    <button
      className="spaceship hidden lg:block"
      onClick={onClick}
      title="Take a tour"
      aria-label="Start guided tour"
    >
      <Image src="/images/ship.png" alt="Tour Guide" width={200} height={200} />
    </button>
  );
}
