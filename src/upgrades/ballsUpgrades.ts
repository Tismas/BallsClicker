import { board } from "../Board";
import { Upgrade } from "./Upgrade";

export const ballsUpgrades: Upgrade[] = [
  new Upgrade("More balls", 10, () => {
    board.addBall();
  }),
];
