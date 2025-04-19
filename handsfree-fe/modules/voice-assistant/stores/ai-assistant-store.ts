import { IOrderDetails } from "../../driver/types/order-details-types";
import { create } from "zustand";

interface AIAssistantStoreState {
  isListeningWakeWord: boolean;
  isShow: boolean;
  isRouteClarificationShow: boolean;
  orderDetails: IOrderDetails | null;
  message: string;
}

interface AIAssistantStoreAction {
  setIsListeningWakeWord: (isListeningWakeWord: boolean) => void;
  removeAIAssistant: () => void;
  showAIAssistant: () => void;
  toggleRouteClarificationShow: () => void;
  removeRouteClarification: () => void;
  setMessage: (message: string) => void;
  setOrderDetails: (orderDetails: IOrderDetails | null) => void;
}

const useAIAssistantStore = create<
  AIAssistantStoreState & AIAssistantStoreAction
>((set) => ({
  isListeningWakeWord: true,
  isShow: false,
  isRouteClarificationShow: false,
  message: "",
  orderDetails: null,
  setIsListeningWakeWord: (isListeningWakeWord) =>
    set((state) => ({ ...state, isListeningWakeWord })),
  removeAIAssistant: () =>
    set((state) => ({
      ...state,
      isShow: false,
    })),
  showAIAssistant: () =>
    set((state) => ({
      ...state,
      isShow: true,
    })),
  toggleRouteClarificationShow: () =>
    set((state) => ({
      ...state,
      isRouteClarificationShow: !state.isRouteClarificationShow,
    })),
  removeRouteClarification: () =>
    set((state) => ({
      ...state,
      isRouteClarificationShow: false,
    })),
  setMessage: (message) => set((state) => ({ ...state, message })),
  setOrderDetails: (orderDetails) =>
    set((state) => ({ ...state, orderDetails })),
}));

export default useAIAssistantStore;
