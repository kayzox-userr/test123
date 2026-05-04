import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface Props {
  startFrame: number;
  duration?: number;
  color?: string;
  numLines?: number;
}

export const ActionLines: React.FC<Props> = ({
  startFrame,
  duration = 20,
  color = "#FFD700",
  numLines = 24,
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;
  if (localFrame < 0 || localFrame > duration) return null;

  const opacity = interpolate(localFrame, [0, 6, duration - 4, duration], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(localFrame, [0, duration], [0.3, 1.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity,
        zIndex: 50,
        pointerEvents: "none",
      }}
    >
      <svg
        viewBox="0 0 1000 1000"
        style={{
          position: "absolute",
          width: "200%",
          height: "200%",
          transform: `scale(${scale})`,
        }}
      >
        {Array.from({ length: numLines }).map((_, i) => {
          const angle = (i / numLines) * 360;
          const rad = (angle * Math.PI) / 180;
          const x1 = 500 + Math.cos(rad) * 80;
          const y1 = 500 + Math.sin(rad) * 80;
          const x2 = 500 + Math.cos(rad) * 520;
          const y2 = 500 + Math.sin(rad) * 520;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={color}
              strokeWidth={i % 3 === 0 ? 8 : 4}
              opacity={i % 2 === 0 ? 0.9 : 0.5}
            />
          );
        })}
      </svg>
    </div>
  );
};
