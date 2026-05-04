import React from "react";
import {
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FlashOverlay } from "../components/FlashOverlay";
import { TextPop } from "../components/TextPop";

// Scene 5: frames 0-120 (relative) = absolute 600-720
export const Scene5Bubble: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Dreamy fade in
  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Slow dreamyzoom
  const dreamZoom = interpolate(frame, [0, 120], [1, 1.12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Bubble bob animation (up and down)
  const bubbleBob = Math.sin(frame * 0.12) * 22;
  const bubbleScale = 1 + Math.sin(frame * 0.08) * 0.06;

  // Text slide in from bottom
  const textSlide = spring({
    frame: frame - 35,
    fps,
    config: { damping: 8, stiffness: 200, mass: 1 },
  });
  const textY = frame < 35 ? 200 : interpolate(textSlide, [0, 1], [200, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Sparkle positions
  const sparkles = [
    { x: "28%", y: "32%", size: 18 },
    { x: "72%", y: "28%", size: 14 },
    { x: "20%", y: "58%", size: 16 },
    { x: "78%", y: "62%", size: 20 },
    { x: "50%", y: "22%", size: 12 },
    { x: "15%", y: "40%", size: 15 },
    { x: "85%", y: "45%", size: 13 },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(180deg, #1a0533 0%, #0d1b2a 60%, #0a0a0a 100%)",
        overflow: "hidden",
        opacity: fadeIn,
      }}
    >
      {/* Dreamy background glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% ${40 + bubbleBob * 0.1}%, rgba(138,43,226,0.25) 0%, transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      {/* Main image - dreamy zoom */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${dreamZoom})`,
          transformOrigin: "center center",
          filter: "brightness(0.75) saturate(1.3)",
        }}
      >
        <img
          src={staticFile("img4.jpg")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Dreamy vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(20,0,40,0.8) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Floating sparkles */}
      {sparkles.map((s, i) => {
        const phase = frame * 0.07 + i * 1.1;
        const sparkOpacity = 0.5 + Math.sin(phase) * 0.5;
        const sparkY = Math.sin(phase * 0.8) * 12;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: s.x,
              top: s.y,
              transform: `translate(-50%, calc(-50% + ${sparkY}px))`,
              fontSize: s.size,
              opacity: sparkOpacity,
              zIndex: 60,
              pointerEvents: "none",
            }}
          >
            ✨
          </div>
        );
      })}

      {/* Bubble highlight - additional glow */}
      {frame > 15 && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: `${38 + bubbleBob * 0.025}%`,
            transform: `translate(-50%, -50%) scale(${bubbleScale})`,
            width: 280,
            height: 280,
            borderRadius: "50%",
            border: "3px solid rgba(255,255,255,0.3)",
            boxShadow: `0 0 40px rgba(200,150,255,0.5), inset 0 0 30px rgba(255,255,255,0.1)`,
            pointerEvents: "none",
            zIndex: 65,
          }}
        />
      )}

      {/* Slide-in text */}
      {frame > 35 && (
        <div
          style={{
            position: "absolute",
            bottom: "12%",
            left: "50%",
            transform: `translate(-50%, ${textY}px)`,
            fontFamily: "'Impact', 'Arial Black', sans-serif",
            fontSize: 60,
            fontWeight: 900,
            color: "#fff",
            textShadow: "0 0 20px rgba(180,100,255,0.8), 4px 4px 0 #000",
            textAlign: "center",
            width: "90%",
            lineHeight: 1.3,
            zIndex: 100,
            background: "rgba(0,0,0,0.55)",
            padding: "16px 32px",
            borderRadius: 16,
            border: "2px solid rgba(200,100,255,0.4)",
          }}
        >
          vit dans sa tête loyer gratuit 💀
        </div>
      )}

      {/* Second text */}
      <TextPop
        text="RENT FREE 🤣"
        startFrame={70}
        color="#FFD700"
        fontSize={100}
        rotation={-8}
        x="50%"
        y="30%"
        duration={55}
      />

      <FlashOverlay triggerFrame={20} color="#9B59B6" duration={8} />
      <FlashOverlay triggerFrame={100} color="#ffffff" duration={20} />
    </div>
  );
};
