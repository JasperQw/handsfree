import { getChatHistoryAPI } from "../../modules/driver/api/driver-api";
import ChatBubble from "../../modules/driver/components/chat/ChatBubble";
import useChatStore from "../../modules/driver/stores/chat-store";
import { Sender } from "../../modules/driver/types/chat-types";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ClientChatPage = () => {
  const messages = useChatStore((state) => state.messages);
  const setMessages = useChatStore((state) => state.setChatMessages);
  const addMessage = useChatStore((state) => state.addMessage);
  const [inputText, setInputText] = useState("");
  useEffect(() => {
    getChatHistory();
  }, []);

  const getChatHistory = async () => {
    try {
      const data = await getChatHistoryAPI();
      setMessages(data);
    } catch (error) {
      console.error("Failed to fetch chat history:", error);
    }
  };

  const handleSendMessage = () => {
    const newMessage = {
      message: inputText.trim(),
      sender: Sender.DRIVER,
    };
    const currentTimestamp = Date.now();

    addMessage({
      ...newMessage,
      id: currentTimestamp,
      timestamp: currentTimestamp / 1000,
    });
    setInputText("");
  };
  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView
        className="flex-1 p-4"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Text className="text-lg text-gray-500 text-center my-2.5">
          Thursday, 21 Jan 2025
        </Text>
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
      </ScrollView>

      <View className="flex-row items-center p-2.5 border-t border-gray-200">
        <TextInput
          className="flex-1 bg-white rounded-md py-3 px-4 mr-2 my-2"
          placeholder="Ask Something..."
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity
          onPress={handleSendMessage}
          className="bg-white rounded-full p-3"
        >
          <Feather name="send" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ClientChatPage;
