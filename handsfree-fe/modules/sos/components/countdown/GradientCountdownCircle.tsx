import { View, Text } from "react-native";
import React, { FC } from "react";
import { LinearGradient } from "expo-linear-gradient";

interface GradientCountdownCircleProps {
  countdown: number;
}

const GradientCountdownCircle: FC<GradientCountdownCircleProps> = ({
  countdown,
}) => {
  return (
    <LinearGradient
      colors={["#FFA07A", "#FF6A6A"]}
      className="w-[160px] h-[160px] justify-center items-center z-[1]"
      style={{
        borderRadius: 80,
      }}
    >
      <Text className="text-4xl text-white font-bold">{countdown}</Text>
    </LinearGradient>
  );
};

export default GradientCountdownCircle;
