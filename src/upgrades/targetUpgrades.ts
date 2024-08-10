import { board } from "../Board";
import { Upgrade } from "./Upgrade";

export const targetUpgrades: Upgrade[] = [
  new Upgrade("More targets", 10, () => {
    board.addTarget();
  }),
];
