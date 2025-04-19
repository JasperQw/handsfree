import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import useDriverOrderStore from "../../stores/driver-order-store";
import { speak } from "expo-speech";
import useAIAssistantStore from "../../../voice-assistant/stores/ai-assistant-store";

interface DrivingBottomProps {
  onMenuPress: () => void;
  onShieldAlert: () => void;
}

const NEW_ORDER_PROMPT =
  "You have a new order departing from Restaurant Nasi Kandar, Resident Kerinchi to  Kolej Kediaman Ketujuh, Universiti Malaya.";

const DrivingBottom: React.FC<DrivingBottomProps> = ({
  onMenuPress,
  onShieldAlert,
}) => {
  const showNewOrder = useDriverOrderStore((state) => state.showNewOrder);
  const setIsListeningWakeWord = useAIAssistantStore(
    (state) => state.setIsListeningWakeWord
  );
  const showAIAssistant = useAIAssistantStore((state) => state.showAIAssistant);
  const removeAIAssistant = useAIAssistantStore(
    (state) => state.removeAIAssistant
  );
  const setAssistantMessage = useAIAssistantStore((state) => state.setMessage);

  const readNewOrderDetails = () => {
    setIsListeningWakeWord(false);
    speak(NEW_ORDER_PROMPT, {
      language: "en-US",
      onStart: () => {
        showAIAssistant();
        setAssistantMessage(NEW_ORDER_PROMPT);
      },

      onDone: () => {
        removeAIAssistant();
        setAssistantMessage("");
        setIsListeningWakeWord(true);
      },
      onError: (error) => {
        console.error("Speech synthesis error:", error);
      },
    });
  };

  return (
    <View className="rounded-t-3xl bg-white p-5 flex-row justify-between items-center shadow-md">
      <TouchableOpacity
        onPress={onMenuPress}
        className="w-[50px] h-[50px] rounded-full justify-center items-center border border-[#979797]"
      >
        <Feather name="menu" size={24} color="black" />
      </TouchableOpacity>

      {/* Time + Distance  */}
      <TouchableWithoutFeedback
        onPress={() => {
          // To trigger new order (for demo purposes)
          showNewOrder();
          readNewOrderDetails();
        }}
      >
        <View className="flex-col items-center">
          <Text className="text-[25px] leading-7 font-bold text-black">
            10 min
          </Text>
          <View className="flex-row items-center gap-[5px]">
            <Text className="text-sm leading-6 font-semibold text-[#818181]">
              3.7 km
            </Text>
            <Text className="text-sm leading-6 font-semibold text-[#818181]">
              8:23 pm
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <TouchableOpacity
        className="bg-[#F6F6DC] w-[50px] h-[50px] rounded-full justify-center items-center shadow-md shadow-black"
        onPress={onShieldAlert}
      >
        <MaterialCommunityIcons
          name="shield-alert-outline"
          size={33}
          color="#FC0000"
        />
      </TouchableOpacity>
    </View>
  );
};

export default DrivingBottom;
