import { WEBSOCKET_URL } from "../../../common/constants/api-constants";
import useDriverSpeakingStore from "../../driver/stores/driver-speaking-store";
import useWebSocketStore from "../stores/web-socket-store";
import { useEffect } from "react";
import io from "socket.io-client";
import useAgent from "../../voice-assistant/hooks/useAgent";
import { Language } from "../../voice-assistant/types/voice-assistant-types";
import {
  IDriverFinalPrompt,
  IDriverInProgressPrompt,
} from "../types/websocket-types";
import useHandleVoiceAssitantResponse from "../../voice-assistant/hooks/useHandleVoiceAssitantResponse";

const useWebSocket = () => {
  const setDriverMessage = useDriverSpeakingStore((state) => state.setMessage);
  const socketIOClient = useWebSocketStore((state) => state.socketIOClient);
  const setSocketIOClient = useWebSocketStore(
    (state) => state.setSocketIOClient
  );

  const {
    handleAssistantResponse,
    handleAssistantResponseOnEmptyPrompt,
    handleAssistantWakeUpResponse,
  } = useHandleVoiceAssitantResponse();

  const { runAgentPipeline } = useAgent();

  useEffect(() => {
    connectToServer();

    return () => {
      if (socketIOClient) {
        socketIOClient.disconnect();
        setSocketIOClient(null);
      }
    };
  }, []);

  // Connect to WebSocket server
  const connectToServer = () => {
    let finalAnswer = false;
    let wakeUp = false;
    let socketIO = io(WEBSOCKET_URL);

    socketIO.on("connect", () => {
      setSocketIOClient(socketIO);
      console.log("Connected", socketIO.id);
    });

    socketIO.on("disconnect", () => {
      setSocketIOClient(null);
      console.log("Disconnected from the server");
    });

    socketIO.on("voice_assistant_wake_up", () => {
      if (wakeUp) return;
      wakeUp = true;
      handleAssistantWakeUpResponse();
      wakeUp = false;
    });

    socketIO.on(`driver_text`, (data: IDriverInProgressPrompt) => {
      setDriverMessage(data.text);
    });

    socketIO.on(`driver_final_text`, async (data: IDriverFinalPrompt) => {
      if (finalAnswer) return;
      finalAnswer = true;
      if (data.isValid) {
        setDriverMessage(data.text);
        const response = await runAgentPipeline(data.text, Language.ENGLISH);
        if (response) handleAssistantResponse(response, socketIO);
      } else handleAssistantResponseOnEmptyPrompt(socketIO);
      finalAnswer = false;
    });
  };
};

export default useWebSocket;
