<script setup lang="ts">
import { computed } from "vue";

import { usePlayerStore } from "../data/playerStore";

const props = defineProps({
  name: { type: String, required: true },
  level: { type: Number, required: true },
  cost: { type: Number, required: true },
});

const player = usePlayerStore();
const canBeBought = computed(() => player.money >= props.cost);
const costColor = computed(() => (canBeBought.value ? "rgba(0,255,0,0.5)" : "rgba(255, 0, 0, 0.5)"));
const visibility = computed(() => (player.totalMoneyEarned >= props.cost / 10 ? "visible" : "hidden"));
</script>

<template>
  <div>
    <button class="container" @click="$emit('click')">
      <div class="left">
        <div class="name">{{ name }}</div>
        <div class="cost">${{ cost }}</div>
      </div>
      <div class="right">
        <div class="level">{{ level }}</div>
      </div>
    </button>
  </div>
</template>

<style scoped lang="scss">
.container {
  background: #333;
  color: #ccc;
  padding: 16px;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
  margin-bottom: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  visibility: v-bind(visibility);

  border: 5px solid rgba(0, 0, 0, 0.5);
}

.left {
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.name {
  font-size: 26px;
}
.cost {
  font-size: 16px;
  color: v-bind(costColor);
}

.right {
  text-align: right;
}
.level {
  font-size: 50px;
  color: rgba(255, 255, 255, 0.5);
}
</style>
