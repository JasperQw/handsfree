import { Socket } from "socket.io-client";
import { create } from "zustand";

interface WebSocketStoreState {
  socketIOClient: Socket | null;
}

interface WebSocketStoreAction {
  setSocketIOClient: (socketIOClient: Socket | null) => void;
}

const useWebSocketStore = create<WebSocketStoreState & WebSocketStoreAction>(
  (set) => ({
    socketIOClient: null,
    setSocketIOClient: (socketIOClient) =>
      set((_state) => ({
        socketIOClient,
      })),
  })
);

export default useWebSocketStore;
