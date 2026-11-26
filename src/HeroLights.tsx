import type { CSSProperties } from "react";

type Bulb = { x: number; y: number; star?: boolean };

// Positions are percentages of the hero picture. They come from the yellow
// bulbs in the artwork, not the fox, so the glow sits on the tree lights.
const DESKTOP_BULBS: Bulb[] = [
  { x: 94.3, y: 23.0, star: true },
  { x: 93.9, y: 37.0 },
  { x: 98.4, y: 47.3 },
  { x: 96.4, y: 49.6 },
  { x: 91.5, y: 50.9 },
  { x: 93.6, y: 51.0 },
  { x: 90.1, y: 57.7 },
  { x: 95.9, y: 60.3 },
  { x: 93.6, y: 62.7 },
  { x: 90.0, y: 72.7 },
  { x: 98.8, y: 73.5 },
  { x: 93.9, y: 74.7 },
];

const MOBILE_BULBS: Bulb[] = [
  { x: 3.0, y: 64.8 },
  { x: 7.5, y: 67.3 },
  { x: 0.4, y: 69.6 },
  { x: 2.8, y: 69.8 },
  { x: 1.5, y: 76.3 },
  { x: 3.9, y: 76.6 },
  { x: 15.2, y: 80.0 },
  { x: 9.2, y: 83.0 },
  { x: 3.8, y: 83.5 },
  { x: 15.7, y: 83.9 },
  { x: 1.7, y: 86.1 },
  { x: 10.8, y: 86.7 },
  { x: 7.0, y: 87.1 },
  { x: 16.0, y: 88.5 },
  { x: 18.2, y: 88.7 },
  { x: 97.1, y: 79.1 },
];

/** A soft twinkle on the Christmas-tree bulbs painted into the hero. */
export function HeroLights({ variant }: { variant: "desktop" | "mobile" }) {
  const bulbs = variant === "desktop" ? DESKTOP_BULBS : MOBILE_BULBS;

  return (
    <div aria-hidden="true" className="hero-lights">
      {bulbs.map((bulb, index) => (
        <span
          className={bulb.star ? "hero-lights__bulb hero-lights__bulb--star" : "hero-lights__bulb"}
          key={`${bulb.x}-${bulb.y}`}
          style={{ left: `${bulb.x}%`, top: `${bulb.y}%`, "--n": index } as CSSProperties}
        />
      ))}
    </div>
  );
}
