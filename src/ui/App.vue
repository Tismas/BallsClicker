<script setup lang="ts">
import { usePlayerStore } from "../data/playerStore";
import UpgradeButton from "./UpgradeButton.vue";

const player = usePlayerStore();
</script>

<template>
  <div class="container">
    <header>Money: ${{ player.money }}</header>
    <section>
      <div v-for="upgrade in player.upgrades" :key="upgrade.name">
        <UpgradeButton :name="upgrade.name" :level="upgrade.level" :cost="upgrade.cost" @click="player.buyUpgrade(upgrade)" />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: #222;
  color: #ccc;
}

header {
  font-size: 20px;
  font-weight: bold;
  padding: 16px;
}
</style>
