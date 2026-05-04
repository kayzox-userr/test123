import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface Props {
  word: string;
  startFrame: number;
  x?: string;
  y?: string;
  color?: string;
  bg?: string;
  size?: number;
  rotation?: number;
}

export const ComicText: React.FC<Props> = ({
  word,
  startFrame,
  x = "50%",
  y = "30%",
  color = "#fff",
  bg = "#e63946",
  size = 120,
  rotation = -12,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - startFrame;

  if (local < 0 || local > 50) return null;

  const scale = spring({
    frame: local,
    fps,
    config: { damping: 5, stiffness: 600, mass: 0.5 },
  });

  const opacity = interpolate(local, [40, 50], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const wobble = Math.sin(local * 0.6) * 6;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotation + wobble}deg)`,
        fontFamily: "'Impact', 'Arial Black', sans-serif",
        fontSize: size,
        fontWeight: 900,
        color,
        background: bg,
        padding: "12px 32px",
        borderRadius: 12,
        border: "6px solid #000",
        boxShadow: "8px 8px 0 #000",
        whiteSpace: "nowrap",
        opacity,
        zIndex: 200,
        letterSpacing: "3px",
        textTransform: "uppercase",
        textShadow: "3px 3px 0 #000",
      }}
    >
      {word}
    </div>
  );
};
