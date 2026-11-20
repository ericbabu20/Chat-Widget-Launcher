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

// Fixed, so the flakes don't jump around when the page re-renders.
const FLAKES: Flake[] = [
  { left: "6%", size: 7, duration: 13, delay: -2, drift: 16, opacity: 0.95, rest: "12%" },
  { left: "14%", size: 5, duration: 16, delay: -9, drift: -12, opacity: 0.75, rest: "38%" },
  { left: "22%", size: 9, duration: 11, delay: -4, drift: 22, opacity: 0.9, rest: "64%" },
  { left: "31%", size: 5, duration: 15, delay: -11, drift: 8, opacity: 0.7, rest: "22%" },
  { left: "39%", size: 8, duration: 12, delay: -1, drift: -18, opacity: 0.95, rest: "78%" },
  { left: "48%", size: 5, duration: 17, delay: -7, drift: 14, opacity: 0.7, rest: "48%" },
  { left: "56%", size: 10, duration: 14, delay: -5, drift: -10, opacity: 0.85, rest: "8%" },
  { left: "64%", size: 6, duration: 12, delay: -10, drift: 20, opacity: 0.9, rest: "56%" },
  { left: "72%", size: 5, duration: 18, delay: -3, drift: -16, opacity: 0.75, rest: "30%" },
  { left: "80%", size: 8, duration: 13, delay: -8, drift: 12, opacity: 0.9, rest: "86%" },
  { left: "88%", size: 5, duration: 15, delay: -6, drift: -8, opacity: 0.75, rest: "18%" },
  { left: "94%", size: 7, duration: 11, delay: -12, drift: 18, opacity: 0.85, rest: "70%" },
];

/** A light snowfall, meant to sit inside the Christmas hero picture. */
export function HeroSnow() {
  return (
    <div aria-hidden="true" className="hero-snow">
      {FLAKES.map((flake) => (
        <span
          className="hero-snow__flake"
          key={flake.left}
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
