import {
  AGENT_ERROR_RESPONSE,
  ROUTE_CLARIFICATION_SPEAK,
} from "../constants/voice-assistant-constants";
import { IOrderDetails } from "../../driver/types/order-details-types";
import { Language } from "../types/voice-assistant-types";
import { router } from "expo-router";

export const changeTabAction = (text: string) => {
  if (text === "map") {
    router.push("/driver");
    return {
      text: "I have navigated to the map screen.",
      language: Language.ENGLISH,
    };
  } else if (text === "chat") {
    router.push("/driver/client-chat");
    return {
      text: "I have navigated to the chat screen.",
      language: Language.ENGLISH,
    };
  } else {
    console.warn(`Cannot navigate to the tab: ${text}`);
    return AGENT_ERROR_RESPONSE;
  }
};

export const phoneCallAction = (text: string) => {
  const PHONE_CALL_PATH = "/driver/phone-call";
  if (text === "call") {
    router.push(PHONE_CALL_PATH);
    return {
      text: "Calling...",
      language: Language.ENGLISH,
    };
  } else if (text === "accept_call") {
    router.replace(PHONE_CALL_PATH);
    return {
      text: "I have accepted the incoming call.",
      language: Language.ENGLISH,
    };
  } else if (text === "reject_call") {
    router.dismiss();
    return {
      text: "I have rejected the incoming call.",
      language: Language.ENGLISH,
    };
  } else {
    return {
      text: "There is no incoming call.",
      language: Language.ENGLISH,
    };
  }
};

export const emergencyAction = (text: string) => {
  if (text === "emergency") {
    router.push("/driver/emergency-call");
    return {
      text: "Making emergency call...",
      language: Language.ENGLISH,
    };
  } else if (text === "continue_sos") {
    router.push("/sos/alert-sent");
    return {
      text: "Continuing to send SOS...",
      language: Language.ENGLISH,
    };
  } else if (text === "cancel_sos") {
    router.replace("/sos/sos-safe");
    return {
      text: "Cancelling the SOS...",
      language: Language.ENGLISH,
    };
  } else {
    console.warn(`Cannot perform emergency action with: ${text}`);
    return AGENT_ERROR_RESPONSE;
  }
};

export const routeClarificationAction = (currentPath: string) => {
  if (currentPath !== "/driver") {
    router.push("/driver");
  }

  return {
    text: ROUTE_CLARIFICATION_SPEAK,
    language: Language.ENGLISH,
  };
};

export const getOrderDetailsPrompt = (orderDetails: IOrderDetails) => {
  const {
    name,
    pickUpLocation,
    dropOffLocation,
    paymentAmount,
    paymentMethod,
  } = orderDetails;

  return {
    text: `Passenger Name: ${name}, pick up at ${pickUpLocation}, drop off at ${dropOffLocation}, total charges is ${paymentAmount} and pay by ${paymentMethod}`,
    language: Language.ENGLISH,
  };
};
