import { create } from "zustand";

interface DriverSpeakingStoreState {
  isShow: boolean;
  message: string;
}

interface DriverSpeakingStoreAction {
  removeShow: () => void;
  showDriverSpeaking: () => void;
  setMessage: (message: string) => void;
}

const useDriverSpeakingStore = create<
  DriverSpeakingStoreState & DriverSpeakingStoreAction
>((set) => ({
  isShow: false,
  message: "",
  removeShow: () => set((state) => ({ ...state, isShow: false })),
  showDriverSpeaking: () => set((state) => ({ ...state, isShow: true })),
  setMessage: (message) => set((state) => ({ ...state, message })),
}));

export default useDriverSpeakingStore;
