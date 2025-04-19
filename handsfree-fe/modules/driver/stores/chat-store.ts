import { ChatMessage, Sender } from "../types/chat-types";
import { create } from "zustand";

interface ChatStoreState {
  messages: ChatMessage[];
}

interface ChatStoreAction {
  setChatMessages: (messages: ChatMessage[]) => void;
  addMessage: (message: ChatMessage) => void;
  getLastMessages: () => string[];
}

const useChatStore = create<ChatStoreState & ChatStoreAction>((set, get) => ({
  messages: [],
  setChatMessages: (messages) => set((_state) => ({ messages })),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  getLastMessages: () => {
    const lastMessages: ChatMessage[] = [];
    const messages: string[] = [];
    for (let i = get().messages.length - 1; i >= 0; i--) {
      let message = get().messages[i];
      if (message.sender === Sender.DRIVER && lastMessages.length !== 0) break;
      if (message.sender === Sender.PASSENGER) lastMessages.push(message);
    }

    lastMessages.forEach((message) => {
      messages.push(message.message);
    });

    return messages;
  },
}));

export default useChatStore;
