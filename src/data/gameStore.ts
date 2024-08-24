import { Canvas, Entity, Vector2 } from "@naszos/game-utils";
import { defineStore } from "pinia";

export const useGameStore = defineStore("game", {
  state: () => {
    return { canvas: new Canvas("game-canvas", { fullScreen: { padding: new Vector2(300, 0) }, background: "#111" }) };
  },
  actions: {
    addEntity(value: Entity) {
      this.canvas.addEntity(value);
    },
  },
});
