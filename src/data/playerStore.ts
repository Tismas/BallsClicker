import { defineStore } from "pinia";

import { ClickTarget } from "../game/entities/ClickTarget";
import { BasicBall } from "../game/entities/balls/BasicBall";
import { useGameStore } from "./gameStore";

interface Upgrade {
  name: string;
  cost: number;
  level: number;
  onBuy: () => void;
}

interface PlayerState {
  money: number;
  totalMoneyEarned: number;

  basicBall: Upgrade;
  clickTarget: Upgrade;
}

export const usePlayerStore = defineStore("player", {
  state: (): PlayerState => {
    return {
      money: 10,
      totalMoneyEarned: 10,
      clickTarget: { name: "Click Target", cost: 10, level: 0, onBuy: () => useGameStore().addEntity(new ClickTarget()) },
      basicBall: { name: "Basic Ball", cost: 50, level: 0, onBuy: () => useGameStore().addEntity(new BasicBall()) },
    };
  },
  getters: {
    upgrades: (state) => [state.clickTarget, state.basicBall],
  },
  actions: {
    gainMoney(value: number) {
      this.money += value;
      this.totalMoneyEarned += value;
    },

    buyUpgrade(upgrade: Upgrade) {
      if (this.money < upgrade.cost) return;

      this.money -= upgrade.cost;
      upgrade.cost = Math.ceil(upgrade.cost * 1.5);
      upgrade.level++;
      upgrade.onBuy();
    },
  },
});
