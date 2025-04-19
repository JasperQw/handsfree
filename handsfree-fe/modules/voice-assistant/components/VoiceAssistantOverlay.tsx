import { View } from "react-native";
import React from "react";
import useAIAssistantStore from "../stores/ai-assistant-store";
import AssistantIcon from "./AssistantIcon";
import VoiceChatBubble from "./VoiceChatBubble";
import useDriverSpeakingStore from "../../driver/stores/driver-speaking-store";
import DriverSpeakingIcon from "./DriverSpeakingIcon";
import RouteClarification from "./RouteClarification";

const VoiceAssistantOverlay = () => {
  const isVoiceAssistantShow = useAIAssistantStore((state) => state.isShow);
  const isRouteClarificationShow = useAIAssistantStore(
    (state) => state.isRouteClarificationShow
  );
  const voiceAssistantMessage = useAIAssistantStore((state) => state.message);
  const isDriverSpeakingShow = useDriverSpeakingStore((state) => state.isShow);
  const driverSpeakingMessage = useDriverSpeakingStore(
    (state) => state.message
  );

  return (
    <View className="absolute right-0 bottom-28 mr-2 flex-row items-end justify-end w-full">
      {isVoiceAssistantShow &&
        !isRouteClarificationShow &&
        voiceAssistantMessage !== "" && (
          <View className="max-w-[70%] self-end mb-5">
            <VoiceChatBubble message={voiceAssistantMessage} />
          </View>
        )}

      {isRouteClarificationShow && (
        <View className="max-w-[70%] self-end mb-5">
          <RouteClarification />
        </View>
      )}

      {isVoiceAssistantShow && (
        <View className="bottom-0 right-0 self-end bg-transparents">
          <AssistantIcon />
        </View>
      )}

      {isDriverSpeakingShow && driverSpeakingMessage !== "" && (
        <View className="max-w-[70%] self-end mb-5">
          <VoiceChatBubble message={driverSpeakingMessage} />
        </View>
      )}

      {isDriverSpeakingShow && (
        <View className="bottom-0 right-0 self-end bg-transparent">
          <DriverSpeakingIcon />
        </View>
      )}
    </View>
  );
};

export default VoiceAssistantOverlay;
