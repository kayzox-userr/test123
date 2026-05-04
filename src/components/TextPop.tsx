import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface Props {
  text: string;
  startFrame: number;
  color?: string;
  fontSize?: number;
  rotation?: number;
  x?: string;
  y?: string;
  shadowColor?: string;
  duration?: number;
}

export const TextPop: React.FC<Props> = ({
  text,
  startFrame,
  color = "#FFFF00",
  fontSize = 90,
  rotation = -8,
  x = "50%",
  y = "50%",
  shadowColor = "#000",
  duration = 60,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;

  if (localFrame < 0 || localFrame > duration) return null;

  const scale = spring({
    frame: localFrame,
    fps,
    config: { damping: 6, stiffness: 400, mass: 0.6 },
  });

  const opacity = interpolate(localFrame, [duration - 10, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const wobble = Math.sin(localFrame * 0.4) * 4;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotation + wobble}deg)`,
        fontFamily: "'Impact', 'Arial Black', sans-serif",
        fontSize,
        fontWeight: 900,
        color,
        textShadow: `4px 4px 0 ${shadowColor}, -4px -4px 0 ${shadowColor}, 4px -4px 0 ${shadowColor}, -4px 4px 0 ${shadowColor}`,
        opacity,
        whiteSpace: "nowrap",
        zIndex: 100,
        letterSpacing: "2px",
        textTransform: "uppercase",
      }}
    >
      {text}
    </div>
  );
};
