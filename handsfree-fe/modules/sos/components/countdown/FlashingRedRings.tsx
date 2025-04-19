import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { Animated } from "react-native";

const FlashingRedRings = () => {
  const flashAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(flashAnim, {
          toValue: 0.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(flashAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [flashAnim]);

  return (
    <>
      {/* Dashed concentric rings with flashing red overlay */}
      {[1, 2, 3, 4].map((multiplier, index) => {
        const size = 240 + multiplier * 40;
        // Keeping dynamic styles inline for rings
        return (
          <View
            key={index}
            style={{
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                borderWidth: 1,
                borderStyle: "dashed",
                borderColor: "rgba(0, 200, 0, 0.3)",
                position: "absolute",
              }}
            />
            <Animated.View
              style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: "rgba(255, 0, 0, 0.2)",
                position: "absolute",
                opacity: flashAnim,
              }}
              pointerEvents="none"
            />
          </View>
        );
      })}
    </>
  );
};

export default FlashingRedRings;
