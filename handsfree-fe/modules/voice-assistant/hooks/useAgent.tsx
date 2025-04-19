import {
  activateAgentAction,
  summarizeAndTranslatePassengerMessages,
} from "../api/voice-assistant-api";
import { AGENT_ERROR_RESPONSE } from "../constants/voice-assistant-constants";
import { CURRENT_ORDER_DETAILS } from "../data/order-details-data";
import useAIAssistantStore from "../stores/ai-assistant-store";
import useChatStore from "../../driver/stores/chat-store";
import useDriverSpeakingStore from "../../driver/stores/driver-speaking-store";
import { IOrderDetails } from "../../driver/types/order-details-types";
import { ActionType, Language } from "../types/voice-assistant-types";
import {
  changeTabAction,
  emergencyAction,
  getOrderDetailsPrompt,
  phoneCallAction,
  routeClarificationAction,
} from "../utils/action-utils";
import { usePathname, useRootNavigationState } from "expo-router";
import { getChatHistoryAPI } from "../../driver/api/driver-api";
import useDriverOrderStore from "../../driver/stores/driver-order-store";

const useAgent = () => {
  const currentPath = usePathname();

  const showAIAssistant = useAIAssistantStore((state) => state.showAIAssistant);
  const removeAIAssistant = useAIAssistantStore(
    (state) => state.removeAIAssistant
  );
  const setAssistantMessage = useAIAssistantStore((state) => state.setMessage);
  const removeDriverSpeakingShow = useDriverSpeakingStore(
    (state) => state.removeShow
  );
  const setDriverMessage = useDriverSpeakingStore((state) => state.setMessage);
  const toggleRouteClarificationShow = useAIAssistantStore(
    (state) => state.toggleRouteClarificationShow
  );
  const getLastMessages = useChatStore((state) => state.getLastMessages);
  const setOrderDetails = useAIAssistantStore((state) => state.setOrderDetails);
  const setMessages = useChatStore((state) => state.setChatMessages);
  const removeNewOrder = useDriverOrderStore((state) => state.removeNewOrder);

  const getChatHistory = async () => {
    try {
      const data = await getChatHistoryAPI();
      setMessages(data);
    } catch (error) {
      console.error("Failed to fetch chat history:", error);
    }
  };

  const runAgentPipeline = async (prompt: string, language: Language) => {
    const agentResponse = await activateAgentAction(prompt, language);
    removeDriverSpeakingShow();
    setDriverMessage("");
    showAIAssistant();
    const { isAction, text, action } = agentResponse;

    // Hardcoded chat history retrieval (not good)
    if (text === "I have sent the message to the passenger.") {
      await getChatHistory();
    }
    if (!isAction) return agentResponse;

    if (!action) return AGENT_ERROR_RESPONSE;
    switch (action) {
      case ActionType.CHANGE_TABS:
        return changeTabAction(text);
      case ActionType.PHONE_CALL:
        return phoneCallAction(text);
      case ActionType.EMERGENCY_CALL:
        return emergencyAction(text);
      case ActionType.PRECAUTION_STEPS:
        return agentResponse;
      case ActionType.TRAFFIC_HIGHLIGHT:
        return agentResponse;
      case ActionType.ROUTE_CLARIFICATION:
        setAssistantMessage("");
        toggleRouteClarificationShow();
        return routeClarificationAction(currentPath);
      case ActionType.READ_PASSENGER_CHAT:
        const lastMessages = getLastMessages();
        if (lastMessages.length === 0)
          return {
            text: "There is no messages from the passenger.",
            language: Language.ENGLISH,
          };

        return await summarizeAndTranslatePassengerMessages(
          lastMessages,
          Language.ENGLISH
        );
      case ActionType.ORDER:
        if (text === "current_order_details") {
          setOrderDetails(CURRENT_ORDER_DETAILS);
          removeAIAssistant();
          return getOrderDetailsPrompt(CURRENT_ORDER_DETAILS);
        } else if (text === "accept_order") {
          removeNewOrder();
          return {
            text: "You have accepted the order",
            language: Language.ENGLISH,
          };
        } else if (text === "reject_order") {
          removeNewOrder();
          return {
            text: "You have rejected the order",
            language: Language.ENGLISH,
          };
        } else {
          console.error(`Unable to process the action with text: ${text}`);
          return AGENT_ERROR_RESPONSE;
        }
      case ActionType.INCOMING_ORDER_DETAILS:
        try {
          const orderDetails: IOrderDetails = JSON.parse(text);
          setOrderDetails(orderDetails);
          removeAIAssistant();
          return getOrderDetailsPrompt(orderDetails);
        } catch (err) {
          console.error("Fail to get the incoming order details", err);
          return {
            text: "Fail to get the incoming order details.",
            language: Language.ENGLISH,
          };
        }
      default:
        return AGENT_ERROR_RESPONSE;
    }
  };

  return {
    runAgentPipeline,
  };
};

export default useAgent;
