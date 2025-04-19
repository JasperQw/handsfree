import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { View, Text } from "react-native"; // Removed StyleSheet import

const FloodAlert = () => {
  return (
    <View className="mx-10 px-5 py-4 rounded-xl bg-[#0C64F1] flex-row items-center">
      <FontAwesome6 name="house-flood-water" size={24} color="white" />
      <Text className="text-white text-2xl ml-2.5 font-bold">
        Flood detected infront
      </Text>
    </View>
  );
};

export default FloodAlert;
