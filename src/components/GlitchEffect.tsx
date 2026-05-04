import React from "react";
import { random, useCurrentFrame } from "remotion";

interface Props {
  children: React.ReactNode;
  active?: boolean;
  intensity?: number;
}

// Uses Remotion's seeded random() for deterministic rendering
export const GlitchEffect: React.FC<Props> = ({
  children,
  active = true,
  intensity = 8,
}) => {
  const frame = useCurrentFrame();

  if (!active || frame % 5 !== 0) {
    return <>{children}</>;
  }

  const seed = frame * 1000;
  const dx = (random(seed) - 0.5) * intensity * 2;
  const clip1 = random(seed + 1) * 60;
  const clip2 = clip1 + random(seed + 2) * 30;

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div style={{ position: "absolute", inset: 0 }}>{children}</div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          clipPath: `inset(${clip1}% 0 ${100 - clip2}% 0)`,
          transform: `translateX(${dx}px)`,
          mixBlendMode: "screen",
          filter: "hue-rotate(90deg) saturate(3)",
          opacity: 0.7,
        }}
      >
        {children}
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          clipPath: `inset(${clip2}% 0 ${100 - clip1 - 10}% 0)`,
          transform: `translateX(${-dx}px)`,
          mixBlendMode: "screen",
          filter: "hue-rotate(-90deg) saturate(3)",
          opacity: 0.6,
        }}
      >
        {children}
      </div>
    </div>
  );
};
