import React from "react";
import {
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Scene 6: frames 0-30 (relative) = absolute 720-750
export const Scene6Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Rapid flash between images
  const imageIndex = Math.floor(frame / 3) % 4 + 1;

  const finScale = spring({
    frame: frame - 5,
    fps,
    config: { damping: 4, stiffness: 600, mass: 0.4 },
  });

  const bgColors = ["#ff2222", "#2222ff", "#22ff22", "#ffff22"];
  const bgColor = bgColors[Math.floor(frame / 4) % 4];

  const fadeOut = interpolate(frame, [20, 30], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: bgColor,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        opacity: fadeOut,
      }}
    >
      {/* Flashing 2x2 grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          width: "90%",
          height: "70%",
          gap: 8,
          borderRadius: 16,
          overflow: "hidden",
          border: "6px solid #000",
          transform: `rotate(${Math.sin(frame * 0.4) * 3}deg)`,
        }}
      >
        {[1, 2, 3, 4].map((i) => (
          <img
            key={i}
            src={staticFile(`img${i}.jpg`)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: imageIndex === i ? "brightness(1.4) saturate(2)" : "brightness(0.5)",
              transition: "none",
            }}
          />
        ))}
      </div>

      {/* FIN text */}
      <div
        style={{
          fontFamily: "'Impact', sans-serif",
          fontSize: 150,
          fontWeight: 900,
          color: "#fff",
          textShadow: "6px 6px 0 #000, -6px -6px 0 #000, 0 0 40px rgba(255,255,0,0.8)",
          transform: `scale(${finScale}) rotate(${Math.sin(frame * 0.5) * 6}deg)`,
          letterSpacing: "8px",
          marginTop: 20,
        }}
      >
        FIN 🎬
      </div>
    </div>
  );
};
