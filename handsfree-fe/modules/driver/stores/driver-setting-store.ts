import { create } from "zustand";

interface DriverSettingStoreState {
  isAIAssistantEnabled: boolean;
}

interface DriverSettingStoreAction {
  toggleAIAssistantEnable: () => void;
}

const useDriverSettingStore = create<
  DriverSettingStoreState & DriverSettingStoreAction
>((set) => ({
  isAIAssistantEnabled: true,
  toggleAIAssistantEnable: () =>
    set((state) => ({ isAIAssistantEnabled: !state.isAIAssistantEnabled })),
}));

export default useDriverSettingStore;
