import { API_URL } from "../../../common/constants/api-constants";
import { ChatMessage } from "../types/chat-types";

export const getChatHistoryAPI = async () => {
  const res = await fetch(`${API_URL}/messages`);

  if (res.ok) {
    const data: ChatMessage[] = await res.json();
    return data;
  }

  throw new Error("Fail to get chat history");
};
