import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import {
  TouchableOpacity,
  Image,
  TouchableHighlight,
  View,
} from "react-native";

type SettingButtonProps = {
  onPress: () => void;
};

const SettingButton = ({ onPress }: SettingButtonProps) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={"black"}
      className="rounded-full"
    >
      <View className="bg-white w-[60px] h-[60px] px-5 py-5 z-50 rounded-full shadow-2xl justify-center items-center">
        <FontAwesome name="sliders" size={24} />
      </View>
    </TouchableHighlight>
  );
};

export default SettingButton;
