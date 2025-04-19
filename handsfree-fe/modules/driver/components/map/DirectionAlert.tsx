import { Feather } from "@expo/vector-icons";
import React from "react";
import { View, Text } from "react-native";

const DirectionAlert = () => {
  return (
    <>
      <View
        className={`mx-10 px-5 py-4 rounded-tr-[10px] rounded-br-[10px] rounded-tl-[10px] bg-[#01654F] flex-row items-center`}
      >
        <Feather name="arrow-up" size={24} color="white" />
        <Text className="text-white text-2xl ml-2.5 font-bold">Head North</Text>
      </View>
      <View className="mx-10 self-start rounded-bl-[10px] rounded-br-[10px] bg-[#00513F] flex-row items-center px-2.5 py-2.5 gap-2.5">
        <Text className="text-white text-base ml-2.5 font-bold">Then</Text>
        <Feather name="arrow-up-right" size={24} color="white" />
      </View>
    </>
  );
};

export default DirectionAlert;
