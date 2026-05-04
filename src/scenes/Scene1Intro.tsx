import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const warningScale = spring({
    frame,
    fps,
    config: { damping: 5, stiffness: 500, mass: 0.5 },
  });

  const line2Opacity = interpolate(frame, [18, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const line3Scale = spring({
    frame: frame - 32,
    fps,
    config: { damping: 4, stiffness: 400, mass: 0.8 },
  });

  const shake = frame > 40 ? Math.sin(frame * 9) * 5 : 0;
  const bgFlash = frame % 4 < 2 && frame > 42 ? "#1a0000" : "#000000";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: bgFlash,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
        fontFamily: "'Impact', 'Arial Black', sans-serif",
        transform: `translateX(${shake}px)`,
      }}
    >
      <div
        style={{
          fontSize: 90,
          fontWeight: 900,
          color: "#ff2222",
          textShadow: "0 0 30px #ff0000, 4px 4px 0 #000",
          transform: `scale(${warningScale})`,
          letterSpacing: "6px",
        }}
      >
        ⚠️ WARNING ⚠️
      </div>

      <div
        style={{
          fontSize: 52,
          color: "#fff",
          textAlign: "center",
          opacity: line2Opacity,
          padding: "0 60px",
          textShadow: "3px 3px 0 #000",
          lineHeight: 1.4,
        }}
      >
        ce que vous allez voir...
      </div>

      <div
        style={{
          fontSize: 64,
          fontWeight: 900,
          color: "#FFFF00",
          textAlign: "center",
          textShadow: "4px 4px 0 #000",
          transform: `scale(${line3Scale}) rotate(${Math.sin(frame * 0.3) * 3}deg)`,
          padding: "0 40px",
          lineHeight: 1.3,
        }}
      >
        ...ne peut pas être désappris 💀
      </div>
    </div>
  );
};
