import GradientCountdownCircle from "../../modules/sos/components/countdown/GradientCountdownCircle";
import ScreenDimmingAnimatedView from "../../modules/sos/components/countdown/ScreenDimmingAnimatedView";
import SlideToCancel from "../../modules/sos/components/countdown/SlideToCancel";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FlashingRedRings from "../../modules/sos/components/countdown/FlashingRedRings";

export default function SOSPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(15);
  const [slideProgress, setSlideProgress] = useState(0);
  const { self } = useLocalSearchParams<{ self: string }>();
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;

    if (countdown === 0) {
      // Send SOS logic
      router.replace(
        self === "true" ? "/sos/manual-alert-sent" : "/sos/alert-sent"
      );
      return; // Exit early so we don't start another interval
    }

    timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1500);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleCancel = () => {
    // Navigate to the "safe" screen
    router.replace("/sos/sos-safe");
  };

  return (
    <>
      <GestureHandlerRootView className="flex-1">
        <ScreenDimmingAnimatedView slideProgress={slideProgress} />
        <View className="flex-1 justify-center items-center p-5 bg-white">
          <Text className="text-2xl font-semibold text-center mb-2 mt-10">
            Inform Grab Central ?
          </Text>
          <Text className="text-center text-gray-500 mb-40 text-lg">
            Possible shockwave or accident detected. We will send an SOS alert
            to Grab Central and your emergency contacts if you don't respond.
          </Text>

          <View className="items-center justify-center mb-10">
            {/* Dashed concentric rings with flashing red overlay */}
            <FlashingRedRings />

            {/* Center gradient countdown circle */}
            <GradientCountdownCircle countdown={countdown} />
          </View>

          {/* Simulated slide to cancel button */}
          <View className="flex-1 items-center justify-center mt-40 mb-24">
            <SlideToCancel
              handleCancel={handleCancel}
              onSlideProgress={setSlideProgress}
            />
          </View>
        </View>
      </GestureHandlerRootView>
    </>
  );
}
