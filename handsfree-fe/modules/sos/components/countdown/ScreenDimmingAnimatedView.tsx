import { Animated } from "react-native";
import React, { FC } from "react";

interface ScreenDimmingAnimatedViewProps {
  slideProgress: number;
}

const ScreenDimmingAnimatedView: FC<ScreenDimmingAnimatedViewProps> = ({
  slideProgress,
}) => {
  return (
    <Animated.View
      pointerEvents="none"
      className="absolute inset-0 bg-black/50 z-10"
      style={{
        opacity: Animated.multiply(slideProgress, new Animated.Value(0.5)),
      }}
    />
  );
};

export default ScreenDimmingAnimatedView;
