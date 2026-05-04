import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface Props {
  cx?: string;
  cy?: string;
  color?: string;
  startFrame?: number;
}

export const SoundWaves: React.FC<Props> = ({
  cx = "50%",
  cy = "50%",
  color = "#fff",
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const local = frame - startFrame;

  return (
    <div
      style={{
        position: "absolute",
        left: cx,
        top: cy,
        transform: "translate(-50%, -50%)",
        zIndex: 60,
        pointerEvents: "none",
      }}
    >
      {[0, 10, 20, 30].map((offset) => {
        const lf = local - offset;
        if (lf < 0) return null;
        const radius = interpolate(lf, [0, 40], [20, 250], {
          extrapolateRight: "clamp",
        });
        const opacity = interpolate(lf, [0, 40], [0.9, 0], {
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={offset}
            style={{
              position: "absolute",
              width: radius * 2,
              height: radius * 2,
              border: `4px solid ${color}`,
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
              opacity,
            }}
          />
        );
      })}
    </div>
  );
};
