import { AntDesign } from "@expo/vector-icons";
import React from "react";
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  TouchableWithoutFeedback,
} from "react-native";

const DriverProfile = () => {
  return (
    <TouchableWithoutFeedback className="rounded-full">
      <View className="z-50 rounded-full">
        <Image
          source={require("../../../assets/images/driver_profile_pic.png")}
          className="w-[60px] h-[60px]"
          resizeMode="contain"
        />

        <View className="absolute bottom-[-15px] w-[60px] py-1 bg-white shadow-2xl rounded-full flex-row justify-center items-center gap-1">
          <AntDesign name="star" color={"yellow"} size={14} />
          <Text className="text-sm">4.95</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default DriverProfile;
