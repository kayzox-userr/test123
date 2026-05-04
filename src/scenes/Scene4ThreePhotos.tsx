import React from "react";
import {
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CameraShake } from "../components/CameraShake";
import { FlashOverlay } from "../components/FlashOverlay";
import { SoundWaves } from "../components/SoundWaves";
import { TextPop } from "../components/TextPop";

// Scene 4: frames 0-210 (relative) = absolute 390-600
export const Scene4ThreePhotos: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title phase: 0-30 frames
  const titleScale = spring({
    frame,
    fps,
    config: { damping: 6, stiffness: 400 },
  });

  // Photo 1 (Shrek guy) enters at frame 30 - drops from top
  const p1Y = interpolate(frame, [30, 52], [-900, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const p1BounceScale = spring({
    frame: frame - 50,
    fps,
    config: { damping: 4, stiffness: 350, mass: 0.7 },
  });
  const p1Scale = frame < 50 ? 1 : p1BounceScale;

  // Photo 2 (screaming) enters at frame 80 - slides from right
  const p2X = interpolate(frame, [80, 100], [1200, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const p2Bounce = spring({
    frame: frame - 100,
    fps,
    config: { damping: 5, stiffness: 300, mass: 0.8 },
  });
  const p2Scale = frame < 100 ? 1 : p2Bounce;

  // Photo 3 (smiling) enters at frame 140 - slides from bottom
  const p3Y = interpolate(frame, [140, 162], [1000, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const p3Bounce = spring({
    frame: frame - 160,
    fps,
    config: { damping: 5, stiffness: 320, mass: 0.7 },
  });
  const p3Scale = frame < 160 ? 1 : p3Bounce;

  // Chaos shake at end
  const endShake = frame > 185 ? interpolate(frame, [185, 210], [4, 22], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }) : 0;

  // Shrek label rotation wobble
  const shrekWobble = Math.sin(frame * 0.18) * 6;
  const shrekGlow = frame > 50 ? `0 0 ${20 + Math.sin(frame * 0.2) * 10}px #00ff00` : "none";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Title */}
      {frame < 35 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 20,
            transform: `scale(${titleScale})`,
          }}
        >
          <div
            style={{
              fontFamily: "'Impact', sans-serif",
              fontSize: 100,
              fontWeight: 900,
              color: "#fff",
              textShadow: "4px 4px 0 #000",
            }}
          >
            ces gars 💀
          </div>
          <div
            style={{
              fontFamily: "'Impact', sans-serif",
              fontSize: 60,
              color: "#FF6B6B",
              textShadow: "3px 3px 0 #000",
            }}
          >
            (présentent their finest moments)
          </div>
        </div>
      )}

      <CameraShake intensity={endShake} active={frame > 185}>
        {/* Photo 1 - Shrek guy (top-left) */}
        {frame > 30 && (
          <div
            style={{
              position: "absolute",
              left: "3%",
              top: "5%",
              width: "92%",
              height: "30%",
              transform: `translateY(${p1Y}px) scale(${p1Scale})`,
              transformOrigin: "center bottom",
            }}
          >
            <img
              src={staticFile("img3.jpg")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "0% 0%",
                borderRadius: 16,
                border: "4px solid #00ff00",
                boxShadow: shrekGlow,
              }}
            />
            {frame > 55 && (
              <div
                style={{
                  position: "absolute",
                  bottom: -8,
                  left: "50%",
                  transform: `translateX(-50%) rotate(${shrekWobble}deg)`,
                  fontFamily: "'Impact', sans-serif",
                  fontSize: 36,
                  fontWeight: 900,
                  color: "#00ff00",
                  textShadow: "3px 3px 0 #000",
                  background: "rgba(0,0,0,0.7)",
                  padding: "4px 20px",
                  borderRadius: 8,
                  whiteSpace: "nowrap",
                  zIndex: 80,
                }}
              >
                🟢 WHAT ARE YOU DOING IN MY SWAMP
              </div>
            )}
          </div>
        )}

        {/* Photo 2 - Screaming (middle) */}
        {frame > 80 && (
          <div
            style={{
              position: "absolute",
              left: "3%",
              top: "37%",
              width: "92%",
              height: "30%",
              transform: `translateX(${p2X}px) scale(${p2Scale})`,
              transformOrigin: "center center",
            }}
          >
            <img
              src={staticFile("img3.jpg")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "100% 0%",
                borderRadius: 16,
                border: "4px solid #ff4444",
                filter: frame > 80 ? `saturate(${1 + Math.sin(frame * 0.3) * 0.5})` : "none",
              }}
            />
            {/* Sound waves */}
            <SoundWaves cx="20%" cy="50%" color="#ff4444" startFrame={100} />
            <SoundWaves cx="80%" cy="50%" color="#ff4444" startFrame={115} />

            {frame > 105 && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: `translate(-50%,-50%) rotate(${-Math.sin(frame * 0.5) * 5}deg)`,
                  fontFamily: "'Impact', sans-serif",
                  fontSize: 44,
                  fontWeight: 900,
                  color: "#FF6B6B",
                  textShadow: "3px 3px 0 #000",
                  background: "rgba(0,0,0,0.75)",
                  padding: "6px 24px",
                  borderRadius: 8,
                  whiteSpace: "nowrap",
                }}
              >
                😱 MOI QUAND MON RÉVEIL SONNE
              </div>
            )}
          </div>
        )}

        {/* Photo 3 - Smiling (bottom) */}
        {frame > 140 && (
          <div
            style={{
              position: "absolute",
              left: "3%",
              top: "70%",
              width: "92%",
              height: "27%",
              transform: `translateY(${p3Y}px) scale(${p3Scale})`,
              transformOrigin: "center center",
            }}
          >
            <img
              src={staticFile("img3.jpg")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "50% 100%",
                borderRadius: 16,
                border: "4px solid #FFD700",
              }}
            />
            {frame > 165 && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: `translate(-50%,-50%) rotate(${Math.sin(frame * 0.4) * 3}deg)`,
                  fontFamily: "'Impact', sans-serif",
                  fontSize: 40,
                  fontWeight: 900,
                  color: "#FFD700",
                  textShadow: "3px 3px 0 #000",
                  background: "rgba(0,0,0,0.75)",
                  padding: "6px 24px",
                  borderRadius: 8,
                  whiteSpace: "nowrap",
                }}
              >
                😇 l'innocent... ou pas
              </div>
            )}
          </div>
        )}
      </CameraShake>

      {/* Text pop effects */}
      <TextPop
        text="TOUS PAREILS 💀💀"
        startFrame={190}
        color="#FFFF00"
        fontSize={110}
        rotation={-5}
        x="50%"
        y="50%"
        duration={25}
      />

      {/* Flashes */}
      <FlashOverlay triggerFrame={52} color="#00ff00" duration={5} />
      <FlashOverlay triggerFrame={100} color="#ff4444" duration={5} />
      <FlashOverlay triggerFrame={160} color="#FFD700" duration={5} />
      <FlashOverlay triggerFrame={200} color="#ffffff" duration={12} />
    </div>
  );
};
