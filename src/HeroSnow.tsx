import type { CSSProperties } from "react";

type Flake = {
  left: string;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  opacity: number;
  rest: string;
};

const FLAKE_COUNT = 36;

// A small seeded random number generator. The same seed always gives the same snow, so it never changes between visits.
function seededRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
}

const random = seededRandom(7);

// Spread evenly across the width, with a little jitter so the rows don't look like a grid.
const FLAKES: Flake[] = Array.from({ length: FLAKE_COUNT }, (_, index) => ({
  left: `${((index + 0.5) / FLAKE_COUNT) * 100 + (random() - 0.5) * 4}%`,
  size: 4 + Math.round(random() * 6),
  duration: 10 + random() * 9,
  delay: -random() * 20,
  drift: Math.round((random() - 0.5) * 44),
  opacity: 0.7 + random() * 0.3,
  rest: `${Math.round(random() * 95)}%`,
}));

/** A light snowfall, meant to sit inside the Christmas hero picture. */
export function HeroSnow() {
  return (
    <div aria-hidden="true" className="hero-snow">
      {FLAKES.map((flake, index) => (
        <span
          className="hero-snow__flake"
          key={index}
          style={
            {
              left: flake.left,
              width: flake.size,
              height: flake.size,
              opacity: flake.opacity,
              animationDuration: `${flake.duration}s`,
              animationDelay: `${flake.delay}s`,
              "--drift": `${flake.drift}px`,
              "--rest": flake.rest,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
