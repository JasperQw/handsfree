import { API_URL } from "../../../common/constants/api-constants";
import {
  IAgentResponse,
  IAgentSpeakPayload,
  Language,
} from "../types/voice-assistant-types";
import { AGENT_ERROR_RESPONSE } from "../constants/voice-assistant-constants";

export const translateAPI = async (
  text: string,
  language: Language = Language.ENGLISH
) => {
  try {
    const res = await fetch(`${API_URL}/translate`, {
      method: "POST",
      body: JSON.stringify({ text, language }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const data: IAgentSpeakPayload = await res.json();
      return data;
    }

    return;
  } catch (err) {
    console.error("Fail to translate the text", err);
    return;
  }
};

export const summarizeAndTranslateAPI = async (
  text: string,
  language: Language = Language.ENGLISH
) => {
  const res = await fetch(`${API_URL}/summarise-translate`, {
    method: "POST",
    body: JSON.stringify({ text, language }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const data: IAgentSpeakPayload = await res.json();
    return data;
  }

  return;
};

export const summarizeAndTranslatePassengerMessages = async (
  messages: string[],
  language: Language
) => {
  try {
    const data = await summarizeAndTranslateAPI(messages.toString(), language);

    if (!data) {
      return AGENT_ERROR_RESPONSE;
    }

    return data;
  } catch (err) {
    console.error("Fail to summarize and translate the text", err);
    return AGENT_ERROR_RESPONSE;
  }
};

export const agentAPI = async (
  text: string,
  language: Language = Language.ENGLISH
) => {
  const res = await fetch(`${API_URL}/agent`, {
    method: "POST",
    body: JSON.stringify({ text, language }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const data: IAgentResponse = await res.json();
    return data;
  }

  return;
};

export const activateAgentAction = async (text: string, language: Language) => {
  try {
    const data = await agentAPI(text, language);

    if (!data) {
      return AGENT_ERROR_RESPONSE;
    }

    return data;
  } catch (err) {
    console.error("Fail to activate agent action", err);
    return AGENT_ERROR_RESPONSE;
  }
};
