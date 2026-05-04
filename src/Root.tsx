import { Composition } from "remotion";
import { FunnyEdit } from "./FunnyEdit";

export const Root: React.FC = () => {
  return (
    <Composition
      id="FunnyEdit"
      component={FunnyEdit}
      durationInFrames={750}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
