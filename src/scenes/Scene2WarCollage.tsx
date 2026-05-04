import React from "react";
import {
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ActionLines } from "../components/ActionLines";
import { CameraShake } from "../components/CameraShake";
import { FlashOverlay } from "../components/FlashOverlay";
import { GlitchEffect } from "../components/GlitchEffect";
import { TextPop } from "../components/TextPop";

// Scene 2: frames 0-180 (relative) = absolute 60-240
export const Scene2WarCollage: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Dramatic zoom from 5x to 1x over first 40 frames
  const zoom = interpolate(frame, [0, 40], [5, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // After frame 150, zoom back in for chaos
  const zoomOut = interpolate(frame, [150, 180], [1, 1.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const finalZoom = frame < 150 ? zoom : zoomOut;

  // Panning (slow drift then shake)
  const panX = interpolate(frame, [0, 40, 180], [120, 0, -20], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const shakeIntensity = interpolate(frame, [0, 30, 80, 180], [0, 3, 12, 18], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isGlitching = frame > 140;

  // "67" number floating
  const n67Scale = spring({
    frame: frame - 60,
    fps,
    config: { damping: 4, stiffness: 300 },
  });

  const redOverlayOpacity = interpolate(
    frame,
    [160, 170, 175, 180],
    [0, 0.7, 0.7, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{ width: "100%", height: "100%", background: "#000", overflow: "hidden" }}
    >
      <CameraShake intensity={shakeIntensity} active={frame > 30}>
        <GlitchEffect active={isGlitching} intensity={12}>
          <div
            style={{
              width: "100%",
              height: "100%",
              transform: `scale(${finalZoom}) translateX(${panX}px)`,
              transformOrigin: "center center",
            }}
          >
            <img
              src={staticFile("img1.jpg")}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </GlitchEffect>
      </CameraShake>

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Red dramatic overlay at end */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#ff0000",
          opacity: redOverlayOpacity,
          mixBlendMode: "multiply",
          pointerEvents: "none",
        }}
      />

      {/* Action lines burst */}
      <ActionLines startFrame={38} duration={25} color="#FFD700" numLines={28} />
      <ActionLines startFrame={110} duration={20} color="#FF4444" numLines={20} />

      {/* Text pops */}
      <TextPop
        text="BRUH 💀"
        startFrame={45}
        color="#FFFF00"
        fontSize={130}
        rotation={-10}
        x="50%"
        y="20%"
        duration={55}
      />

      <TextPop
        text="67??? 😭😭😭"
        startFrame={75}
        color="#FF6B6B"
        fontSize={100}
        rotation={8}
        x="50%"
        y="80%"
        duration={50}
      />

      {/* Floating 67 */}
      {frame > 60 && frame < 140 && (
        <>
          {[
            { x: "20%", y: "45%", rot: -15 },
            { x: "75%", y: "55%", rot: 20 },
            { x: "50%", y: "65%", rot: -5 },
          ].map((pos, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: pos.x,
                top: pos.y,
                transform: `translate(-50%,-50%) scale(${n67Scale}) rotate(${pos.rot + Math.sin((frame + i * 20) * 0.1) * 8}deg)`,
                fontFamily: "'Impact', sans-serif",
                fontSize: 72,
                fontWeight: 900,
                color: "#00FF88",
                textShadow: "3px 3px 0 #000, -3px -3px 0 #000",
                zIndex: 90,
              }}
            >
              67
            </div>
          ))}
        </>
      )}

      <TextPop
        text="WHAT IS THIS 💀💀"
        startFrame={130}
        color="#fff"
        fontSize={85}
        rotation={-4}
        x="50%"
        y="50%"
        duration={55}
      />

      {/* Flash pulses */}
      <FlashOverlay triggerFrame={40} color="#ffffff" duration={6} />
      <FlashOverlay triggerFrame={90} color="#ffffff" duration={4} />
      <FlashOverlay triggerFrame={160} color="#ff0000" duration={10} />
      <FlashOverlay triggerFrame={175} color="#ffffff" duration={8} />
    </div>
  );
};
