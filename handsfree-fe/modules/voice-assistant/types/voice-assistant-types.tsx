export const enum VoiceAssistantStatus {
  INIT = "Initializing",
  IDLE = "Idle",
  LISTEN = "Listening",
  SPEAK = "Speaking",
  RECORD = "Recording",
  PROCESS = "Processing",
  REPLY = "Replying",
  ERROR = "Error",
}

export const enum Language {
  ENGLISH = "en",
  MALAY = "ms",
  CHINESE = "zh-CN",
  TAMIL = "ta",
  JAPANESE = "ja",
  KOREA = "ko",
}

export interface IAgentSpeakPayload {
  text: string;
  language: Language;
}

export const enum ActionType {
  CHANGE_TABS = "change_tabs",
  PHONE_CALL = "phone_call",
  EMERGENCY_CALL = "emergency_call",
  ROUTE_CLARIFICATION = "route_clarification",
  ORDER = "order",
  INCOMING_ORDER_DETAILS = "incoming_order_details",
  READ_PASSENGER_CHAT = "read_passenger_chat",
  PRECAUTION_STEPS = "precaution_steps",
  TRAFFIC_HIGHLIGHT = "traffic_highlight",
  TRANSLATE_ANSWER = "translate_answer",
}

export interface IAgentResponse {
  text: string;
  isAction: boolean;
  action?: ActionType;
  language: Language;
}
