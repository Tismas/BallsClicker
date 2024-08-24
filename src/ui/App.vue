<script setup lang="ts">
import { usePlayerStore } from '../data/playerStore';

  const player = usePlayerStore();
</script>

<template>
  <div class="container">
    Money: ${{  player.money }}
    <button @click="player.buyBasicBall">Moar ballz ${{ player.basicBallCost }}</button>
    <button @click="player.buyClickTarget">Moar targets ${{ player.clickTargetCost }}</button>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: #222;
  color: #ccc;
  padding: 16px;
}
</style>
