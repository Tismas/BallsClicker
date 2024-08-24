import { defineStore } from "pinia";

import { ClickTarget } from "../game/entities/ClickTarget";
import { BasicBall } from "../game/entities/balls/BasicBall";
import { useGameStore } from "./gameStore";

export const usePlayerStore = defineStore("player", {
  state: () => {
    return { money: 0, basicBallCost: 10, clickTargetCost: 10 };
  },
  actions: {
    gainMoney(value: number) {
      this.money += value;
    },
    buyBasicBall() {
      if (this.money < this.basicBallCost) return;

      this.money -= this.basicBallCost;
      this.basicBallCost = Math.ceil(this.basicBallCost * 1.1);
      useGameStore().addEntity(new BasicBall());
    },
    buyClickTarget() {
      if (this.money < this.clickTargetCost) return;

      this.money -= this.clickTargetCost;
      this.clickTargetCost = Math.ceil(this.clickTargetCost * 1.1);
      useGameStore().addEntity(new ClickTarget());
    },
  },
});
