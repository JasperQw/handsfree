export const enum Sender {
  DRIVER = "Driver",
  PASSENGER = "Passenger",
}

export interface ChatMessage {
  id: number;
  message: string;
  sender: Sender;
  timestamp: number;
}
