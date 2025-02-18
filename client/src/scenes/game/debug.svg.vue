<script setup lang="ts">
import { useClock } from "../../stores/clock.ts"
import { useWorld } from "../../stores/world.ts"
</script>

<script lang="ts">
export default {
  data() {
    return {
        world: useWorld(),
        clock: useClock(),
    };
  },
  methods: {
  },
  beforeMount() {
  }

};
</script>

<template>
    <g fill="#88ff88" font-size="26px">
      <text transform="translate(-500 260)">P x:{{ world.playerLocation.x }}, y:{{ world.playerLocation.y }} </text>
      <text transform="translate(-500 300)">T x:{{ world.targetLocation.x }}, y:{{ world.targetLocation.y }} </text>
      <text transform="translate(-500 340)">{{ world.player.direction }}</text>
      <text transform="translate(-500 380)">T: {{ clock.gameTimeInSeconds }}</text>
    </g>
  
    <g fill="#8888ff" font-size="20px" :transform="'translate(0 ' + (-20*world.player.turns.length) + ')'">
      <text v-for="(turn, index) in world.player.turns" 
        text-anchor="start"
        :opacity = "Math.max(index + 6 - world.player.turns.length, 0) / 5 "
        :transform="'translate(400 ' + (-200 + index * 20) + ')'">{{index }}: {{ turn }}</text>
    </g>
</template>

<style lang="scss"></style>
