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
import { ComicText } from "../components/ComicText";
import { FlashOverlay } from "../components/FlashOverlay";
import { TextPop } from "../components/TextPop";

// Scene 3: frames 0-150 (relative) = absolute 240-390
export const Scene3Thumbnail: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fly in from left with spin
  const slideX = interpolate(frame, [0, 22], [-1200, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const spinIn = interpolate(frame, [0, 22], [-180, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Bounce settle
  const bounceScale = spring({
    frame: frame - 20,
    fps,
    config: { damping: 5, stiffness: 280, mass: 0.7 },
  });

  const finalScale = frame < 20 ? 1 : bounceScale;

  const shakeIntensity = interpolate(
    frame,
    [20, 30, 80, 130, 150],
    [0, 8, 6, 14, 20],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Zoom in dramatically at the end
  const endZoom = interpolate(frame, [130, 150], [1, 1.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Hue shift for madness
  const hueShift = frame > 100 ? (frame - 100) * 8 : 0;
  const saturation = frame > 110 ? interpolate(frame, [110, 150], [1, 3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }) : 1;

  return (
    <div
      style={{ width: "100%", height: "100%", background: "#111", overflow: "hidden" }}
    >
      <CameraShake intensity={shakeIntensity} active={frame > 22}>
        <div
          style={{
            width: "100%",
            height: "100%",
            transform: `translateX(${slideX}px) rotate(${spinIn}deg) scale(${finalScale * endZoom})`,
            transformOrigin: "center center",
            filter: `hue-rotate(${hueShift}deg) saturate(${saturation})`,
          }}
        >
          <img
            src={staticFile("img2.jpg")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </CameraShake>

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Action lines on entry */}
      <ActionLines startFrame={20} duration={22} color="#FFD700" numLines={32} />
      <ActionLines startFrame={120} duration={20} color="#FF4444" numLines={20} />

      {/* Comic texts */}
      <ComicText
        word="CRASH! 💥"
        startFrame={25}
        x="50%"
        y="18%"
        bg="#e63946"
        color="#fff"
        size={110}
        rotation={-14}
      />
      <ComicText
        word="POW! 👊"
        startFrame={55}
        x="25%"
        y="70%"
        bg="#f4a261"
        color="#000"
        size={90}
        rotation={12}
      />
      <ComicText
        word="BAM! 🤯"
        startFrame={85}
        x="75%"
        y="80%"
        bg="#2a9d8f"
        color="#fff"
        size={85}
        rotation={-8}
      />

      <TextPop
        text="LUI 😭"
        startFrame={105}
        color="#FFFF00"
        fontSize={110}
        rotation={-6}
        x="50%"
        y="50%"
        duration={50}
      />

      <TextPop
        text="C'EST FINI 💀"
        startFrame={130}
        color="#FF4444"
        fontSize={100}
        rotation={5}
        x="50%"
        y="82%"
        duration={30}
      />

      {/* Flashes */}
      <FlashOverlay triggerFrame={22} color="#ffffff" duration={5} />
      <FlashOverlay triggerFrame={55} color="#FFD700" duration={4} />
      <FlashOverlay triggerFrame={90} color="#ffffff" duration={4} />
      <FlashOverlay triggerFrame={140} color="#ff0000" duration={12} />
    </div>
  );
};
