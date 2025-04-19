import React from "react";
import { View, Text, Image } from "react-native";

const OfflineBanner = () => {
  return (
    <View className="flex-row bg-white px-4 w-full py-4 rounded-2xl shadow-2xl elevation-lg items-center gap-5">
      {/* <Image
        source={require("../../../assets/images/offline_icon.png")}
        className="w-5 h-5 mr-3"
        resizeMode="contain"
      /> */}

      <View className="w-4 h-4 bg-red-500 rounded-full" />
      <Text className="text-black font-semibold text-[20px] flex-1">
        You're offline
      </Text>
    </View>
  );
};

export default OfflineBanner;
