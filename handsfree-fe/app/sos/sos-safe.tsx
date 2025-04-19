import Background from "../../common/components/Background";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function SOSSafePage() {
  const router = useRouter();

  return (
    <>
      {/* Stack.Screen configuration remains unchanged */}
      <Background>
        <View className="flex-1 justify-center items-center px-6">
          {/* Safe Icon */}
          <View className="mb-5 px-2.5">
            <Image
              source={require("../../assets/images/safe_icon.png")}
              className="w-[270px] h-[270px]"
              resizeMode="contain"
            />
          </View>

          {/* Title */}
          <Text className="text-2xl font-semibold text-center mb-2 text-gray-800">
            You're Safe
          </Text>

          {/* Subtitle */}
          <Text className="text-lg text-center text-gray-500 mb-6">
            Thanks for letting us know. No SOS alert was sent.
          </Text>

          {/* Button */}
          <TouchableOpacity
            onPress={() => router.dismissAll()} // Navigate back to the home screen
            className="bg-emerald-500 w-full py-4 rounded-xl absolute bottom-[50px]"
          >
            <Text className="text-white text-center text-lg font-semibold">
              Back to Home
            </Text>
          </TouchableOpacity>
        </View>
      </Background>
    </>
  );
}
