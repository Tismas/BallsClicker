import { Canvas, Entity, Vector2 } from "@naszos/game-utils";
import { defineStore } from "pinia";

const canvas = new Canvas("game-canvas", { fullScreen: { padding: new Vector2(300, 0) }, background: "#111" });

export const useGameStore = defineStore("game", {
  state: () => {
    return { canvas };
  },
  actions: {
    addEntity(value: Entity) {
      this.canvas.addEntity(value);
    },
  },
});
