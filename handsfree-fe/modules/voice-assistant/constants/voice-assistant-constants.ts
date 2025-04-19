import { IAgentResponse, Language } from "../types/voice-assistant-types";
import { Audio } from "expo-av";

export const WAKE_WORD = "Hey Alex";
export const WAKE_WORD_RESPONSE = "Hey, How can I help you?";
export const RECORDING_OPTIONS = Audio.RecordingOptionsPresets.HIGH_QUALITY;

export const AGENT_ERROR_RESPONSE: IAgentResponse = {
  text: "Sorry, I encountered an issue processing your request.",
  isAction: false,
  action: undefined,
  language: Language.ENGLISH,
};

export const ROUTE_CLARIFICATION_SPEAK =
  "Now interpreting & reading aloud route clarification...Starting from Kuala Lumpur City Center, make a sharp right turn in 100 meters. Then, at Lot 10 on Jalan Sultan Ismail, make a left turn and continue straight for 800 meters. Keep heading straight on Jalan Sultan Ismail for another 300 meters — your destination, Petronas Twin Towers, will be on the left.";
