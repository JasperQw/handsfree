import useAIAssistantStore from "../stores/ai-assistant-store";
import useDriverSpeakingStore from "../../driver/stores/driver-speaking-store";
import { speak } from "expo-speech";
import { Socket } from "socket.io-client";
import { IAgentSpeakPayload, Language } from "../types/voice-assistant-types";
import { WAKE_WORD_RESPONSE } from "../constants/voice-assistant-constants";

const useHandleVoiceAssitantResponse = () => {
  const setIsListeningWakeWord = useAIAssistantStore(
    (state) => state.setIsListeningWakeWord
  );
  const showAIAssistant = useAIAssistantStore((state) => state.showAIAssistant);
  const setAssistantMessage = useAIAssistantStore((state) => state.setMessage);
  const removeAIAssistant = useAIAssistantStore(
    (state) => state.removeAIAssistant
  );
  const removeRouteClarification = useAIAssistantStore(
    (state) => state.removeRouteClarification
  );
  const setOrderDetails = useAIAssistantStore((state) => state.setOrderDetails);
  const showDriverSpeaking = useDriverSpeakingStore(
    (state) => state.showDriverSpeaking
  );
  const removeDriverSpeaking = useDriverSpeakingStore(
    (state) => state.removeShow
  );

  const handleAssistantResponseOnEmptyPrompt = (socketIO: Socket) => {
    const EMPTY_PROMPT_RESPONSE = "Sorry, I don't get what you mean.";
    removeDriverSpeaking();
    speak(EMPTY_PROMPT_RESPONSE, {
      language: Language.ENGLISH,
      onStart: () => {
        showAIAssistant();
        setAssistantMessage(EMPTY_PROMPT_RESPONSE);
      },
      onDone: () => {
        setTimeout(() => {
          removeAIAssistant();
          setAssistantMessage("");
          removeRouteClarification();
          setOrderDetails(null);
          socketIO.emit("start_listen_wake_word");
          setIsListeningWakeWord(true);
        }, 2000);
      },
    });
  };

  const handleAssistantResponse = (
    response: IAgentSpeakPayload,
    socketIO: Socket
  ) => {
    speak(response.text, {
      language: response.language,
      onStart: () => {
        setAssistantMessage(response.text);
      },
      onDone: () => {
        setTimeout(() => {
          removeAIAssistant();
          setAssistantMessage("");
          removeRouteClarification();
          setOrderDetails(null);
          socketIO.emit("start_listen_wake_word");
          setIsListeningWakeWord(true);
        }, 2000);
      },
    });
  };

  const handleAssistantWakeUpResponse = () => {
    speak(WAKE_WORD_RESPONSE, {
      language: "en-US",
      onStart: () => {
        showAIAssistant();
        setAssistantMessage(WAKE_WORD_RESPONSE);
      },
      onBoundary: (boundaries: any) => {
        const { charIndex } = boundaries;
        if (charIndex == 15) {
          setTimeout(() => {
            setIsListeningWakeWord(false);
          }, 300);
        }
      },
      onDone: () => {
        removeAIAssistant();
        setAssistantMessage("");
        showDriverSpeaking();
      },
      onError: (error) => {
        console.error("Speech synthesis error:", error);
      },
    });
  };

  return {
    handleAssistantResponse,
    handleAssistantResponseOnEmptyPrompt,
    handleAssistantWakeUpResponse,
  };
};

export default useHandleVoiceAssitantResponse;
