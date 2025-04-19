import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const AlertSentScreen = () => {
  const router = useRouter();
  const [timer, setTimer] = useState(8);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => Math.max(prevTimer - 1, 0)); // Prevent timer from going below 0
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (timer === 0) {
      router.replace("/sos/crash-report");
    }
  }, [timer, router]);

  const cancelTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      setTimer(-1); // Set timer to a value that won't trigger navigation
      router.replace("/sos/crash-report"); // Navigate immediately
    }
  };

  return (
    <>
      <View className="flex-1 items-center justify-center bg-white px-5">
        <View className="w-[250px] h-[250px] rounded-full bg-white/10 justify-center items-center mb-6">
          <Image
            source={require("../../assets/images/alert_sent_avatar.png")}
            className="w-[220px] h-[220px]"
            resizeMode="contain"
          />
        </View>

        <Text className="text-2xl font-semibold text-center mb-2">
          Alert Sent to Grab Central
        </Text>
        <Text className="text-lg text-center text-gray-500 mb-10">
          Grab Central has been notified of your potential emergency and is
          aware of your situation.
        </Text>

        <TouchableOpacity
          onPress={cancelTimer}
          className="bg-red-500 w-full py-4 rounded-xl mt-10 px-5"
        >
          <Text className="text-white text-center font-semibold text-lg">
            View hypothetical crash report{" "}
            {timer > 0 ? `in ${timer} seconds` : ""}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AlertSentScreen;
