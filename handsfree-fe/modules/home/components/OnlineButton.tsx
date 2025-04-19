import { AntDesign } from "@expo/vector-icons";
import React from "react";
import {
  Text,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  View,
} from "react-native";

type OnlineButtonProps = {
  onPress: () => void;
};

const OnlineButton = ({ onPress }: OnlineButtonProps) => {
  return (
    <TouchableHighlight
      underlayColor={"white"}
      onPress={onPress}
      className="rounded-full"
    >
      <View className="bg-black px-10 py-4 rounded-full flex-row items-center justify-center gap-4">
        <AntDesign name="poweroff" size={24} color={"white"} />
        <Text className="text-white text-[20px] font-semibold">Go online</Text>
      </View>
    </TouchableHighlight>
  );
};

export default OnlineButton;
