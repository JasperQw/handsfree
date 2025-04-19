import React from "react";
import { View, Dimensions, Text } from "react-native";

interface VoiceChatBubbleProps {
  message: string;
}

const { width } = Dimensions.get("window");

const VoiceChatBubble: React.FC<VoiceChatBubbleProps> = ({ message }) => {
  return (
    <View
      className={`self-start bg-white p-3 rounded-t-xl rounded-bl-xl max-w-[${width * 0.7} shadow-md shadow-black opacity-95]`}
    >
      <Text className="text-base text-[#334155] overflow-hidden truncate leading-5 max-h-[100px]">
        {message}
      </Text>
    </View>
  );
};
export default VoiceChatBubble;
