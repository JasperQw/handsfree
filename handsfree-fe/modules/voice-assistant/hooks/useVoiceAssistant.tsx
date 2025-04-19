import useAIAssistantStore from "../stores/ai-assistant-store";
import useWebSocketStore from "../../websocket/stores/web-socket-store";
import {
  useAudioRecorder,
  ExpoAudioStreamModule,
  RecordingConfig,
} from "@siteed/expo-audio-studio";
import { useEffect } from "react";

const useVoiceAssistant = () => {
  const socketIOClient = useWebSocketStore((state) => state.socketIOClient);
  const isListeningWakeWord = useAIAssistantStore(
    (state) => state.isListeningWakeWord
  );
  const { startRecording, stopRecording } = useAudioRecorder();

  useEffect(() => {
    if (socketIOClient && socketIOClient.connected) {
      handleStart();
    }

    return () => {
      try {
        stopRecording();
      } catch (error) {
        console.log("Fail to stop recording: ", error);
      }
    };
  }, [socketIOClient, isListeningWakeWord]);

  const handleStart = async () => {
    const { status } = await ExpoAudioStreamModule.requestPermissionsAsync();
    if (status !== "granted") {
      return;
    }

    // Configure recording options
    const config: RecordingConfig = {
      interval: 500,
      enableProcessing: true,
      sampleRate: 44100,
      channels: 1,
      encoding: "pcm_16bit",

      onAudioStream: async (audioData) => {
        if (!socketIOClient || !socketIOClient.connected) return;

        if (isListeningWakeWord) {
          socketIOClient.emit("wake_word_listening", {
            audio_data: audioData.data,
          });
        } else {
          socketIOClient.emit("instruction_listening", {
            audio_data: audioData.data,
          });
        }
      },
      autoResumeAfterInterruption: false,
    };

    const startResult = await startRecording(config);
    return startResult;
  };
};

export default useVoiceAssistant;
