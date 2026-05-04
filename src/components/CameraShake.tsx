import React from "react";
import { useCurrentFrame } from "remotion";

interface Props {
  children: React.ReactNode;
  intensity?: number;
  active?: boolean;
}

export const CameraShake: React.FC<Props> = ({
  children,
  intensity = 8,
  active = true,
}) => {
  const frame = useCurrentFrame();

  const tx = active
    ? Math.sin(frame * 2.7) * intensity + Math.cos(frame * 5.1) * intensity * 0.5
    : 0;
  const ty = active
    ? Math.cos(frame * 3.3) * intensity + Math.sin(frame * 6.7) * intensity * 0.4
    : 0;
  const rot = active ? Math.sin(frame * 4.1) * intensity * 0.15 : 0;

  return (
    <div
      style={{
        transform: `translate(${tx}px, ${ty}px) rotate(${rot}deg)`,
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </div>
  );
};
