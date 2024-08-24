import { useGameStore } from "../data/gameStore";
import { ClickTarget } from "./entities/ClickTarget";

export const initGame = () => {
  const { addEntity } = useGameStore();

  addEntity(new ClickTarget());
};
