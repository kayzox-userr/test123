import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Scene1Intro } from "./scenes/Scene1Intro";
import { Scene2WarCollage } from "./scenes/Scene2WarCollage";
import { Scene3Thumbnail } from "./scenes/Scene3Thumbnail";
import { Scene4ThreePhotos } from "./scenes/Scene4ThreePhotos";
import { Scene5Bubble } from "./scenes/Scene5Bubble";
import { Scene6Outro } from "./scenes/Scene6Outro";

// Total: 750 frames @ 30fps = 25 seconds
//
// Scene 1 - Intro title:        frame   0 –  60  (2s)
// Scene 2 - War collage:        frame  60 – 240  (6s)
// Scene 3 - YouTube thumbnail:  frame 240 – 390  (5s)
// Scene 4 - Three photos:       frame 390 – 600  (7s)
// Scene 5 - Bubble / dreamy:    frame 600 – 720  (4s)
// Scene 6 - Outro flash:        frame 720 – 750  (1s)

export const FunnyEdit: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Audio src={staticFile("beat.wav")} />

      <Sequence from={0} durationInFrames={60}>
        <Scene1Intro />
      </Sequence>

      <Sequence from={60} durationInFrames={180}>
        <Scene2WarCollage />
      </Sequence>

      <Sequence from={240} durationInFrames={150}>
        <Scene3Thumbnail />
      </Sequence>

      <Sequence from={390} durationInFrames={210}>
        <Scene4ThreePhotos />
      </Sequence>

      <Sequence from={600} durationInFrames={120}>
        <Scene5Bubble />
      </Sequence>

      <Sequence from={720} durationInFrames={30}>
        <Scene6Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
