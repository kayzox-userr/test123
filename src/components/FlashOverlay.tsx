import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface Props {
  triggerFrame: number;
  color?: string;
  duration?: number;
}

export const FlashOverlay: React.FC<Props> = ({
  triggerFrame,
  color = "#ffffff",
  duration = 8,
}) => {
  const frame = useCurrentFrame();
  const local = frame - triggerFrame;

  if (local < 0 || local > duration) return null;

  const opacity = interpolate(local, [0, 2, duration], [0.9, 0.7, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: color,
        opacity,
        zIndex: 300,
        pointerEvents: "none",
      }}
    />
  );
};
