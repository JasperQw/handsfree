import { create } from "zustand";

interface DriverOrderStoreState {
  isNewOrderShow: boolean;
}

interface DriverOrderStoreAction {
  showNewOrder: () => void;
  removeNewOrder: () => void;
}

const useDriverOrderStore = create<
  DriverOrderStoreState & DriverOrderStoreAction
>((set) => ({
  isNewOrderShow: false,
  showNewOrder: () => set((state) => ({ ...state, isNewOrderShow: true })),
  removeNewOrder: () => set((state) => ({ ...state, isNewOrderShow: false })),
}));

export default useDriverOrderStore;
