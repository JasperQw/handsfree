import { Sender } from "../types/chat-types";

const DEFAULT_PASSENGER_PIC = require("../../../assets/images/passenger_profile_pic.png");
const DEFAULT_DRIVER_PIC = require("../../../assets/images/driver_profile_pic.png");

export const getProfilePicSource = (sender: "Passenger" | "Driver") => {
  return sender === "Driver" ? DEFAULT_DRIVER_PIC : DEFAULT_PASSENGER_PIC;
};

export const checkIsDriver = (sender: Sender) => {
  return sender === Sender.DRIVER;
};
