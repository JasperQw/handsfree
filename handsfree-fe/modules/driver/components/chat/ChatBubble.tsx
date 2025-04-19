import { View, Text, Image } from "react-native";
import React, { FC } from "react";
import dayjs from "dayjs";
import { ChatMessage } from "../../types/chat-types";
import { checkIsDriver, getProfilePicSource } from "../../utils/chat-utils";

interface ChatBubbleProps {
  message: ChatMessage;
}

const ChatBubble: FC<ChatBubbleProps> = ({ message }) => {
  const formatDate = (timestamp: number) => {
    return dayjs.unix(timestamp).format("HH:mm");
  };
  const { sender, message: content, timestamp } = message;

  const isDriver = checkIsDriver(sender);
  const chatBubbleAlignment = isDriver ? "flex-row-reverse" : "flex-row";
  const messageBoxAlignment = isDriver ? "items-end" : "items-start";
  const messageBoxColor = isDriver ? "bg-[#617D64]" : "bg-[#E1D8BD]";
  const messageTextColor = isDriver ? "text-white" : "text-black";
  const messageTimestampColorAndAlignment = isDriver
    ? "text-white self-start"
    : "text-gray-600 self-end";

  return (
    <View className={`${chatBubbleAlignment} items-end flex-1 mt-2`}>
      <Image
        source={getProfilePicSource(sender)}
        className="w-[50px] h-[50px] rounded-full mx-2"
      />
      <View className={`${messageBoxAlignment} w-full`}>
        <Text className="text-sm text-gray-500">{sender}</Text>
        <View
          className={`${messageBoxColor} rounded-[10px] p-2 max-w-[70%] mt-2`}
        >
          <Text className={messageTextColor}>{content}</Text>
          <Text
            className={`${messageTimestampColorAndAlignment} text-[10px] mt-0.5`}
          >
            {formatDate(timestamp)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ChatBubble;
