import { RouteClarificationItem } from "../../driver/types/route-clarification-types";

export const routeClarificationItems: RouteClarificationItem[] = [
  {
    locationName: "Kuala Lumpur City Center",
    action: "Sharp right turn on 100m",
    currentPoint: true,
    finalPoint: false,
  },
  {
    locationName: "Lot 10, Jalan Sultan Ismail",
    action: "Left turn, then head straight 800m",
    currentPoint: false,
    finalPoint: false,
  },
  {
    locationName: "Jalan Sultan Ismail",
    action: "Head straight 300m , destination on left",
    currentPoint: false,
    finalPoint: false,
  },
  {
    locationName: "Petronas Twin Towers",
    action: "",
    currentPoint: false,
    finalPoint: true,
  },
];
