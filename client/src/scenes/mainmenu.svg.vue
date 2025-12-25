<script setup lang="ts">
import bob from "../assets/bob.svg.vue";
import { useRoute } from '../stores/route.ts'
</script>

<script lang="ts">
export default {
  data() {
    return {
        route: useRoute(),
        hoverPlay: false,
    }
  },
  methods: {
    play() {
        this.route.changeRoute('game')
    }
  },
  computed: {
    buttonStroke() {
      if (this.hoverPlay) {
        return '#aaaaff'
      }
      return '#8888ff'
    },
    buttonFill() {
      if (this.hoverPlay) {
        return '#000055'
      }
      return '#111166'
    },
    buttonTextStroke() {
      if (this.hoverPlay) {
        return '#ffffff'
      }
      return '#8888ff'
    },
    buttonTextFill() {
      if (this.hoverPlay) {
        return '#8888ff'
      }
      return '#ffffff'
    }
  }
};
</script>

<template>
  <g transform="translate(0 -200)" stroke="#8888ff" font-weight="bold" fill="#ffffff" font-size="110px" stroke-width="3">
    <text transform="translate(0, -75)">Bob's</text>
    <text transform="translate(0, 75)" font-weight="bold">Amazing Game</text>
  </g>
  <g transform="translate(-200 150) scale(1.75)"><bob /></g>

  <g transform="translate(150 150)" font-size="70px">
    <rect x="-200" y="-50" width="400" height="100" rx="40" ry="40" stroke-width="3" :stroke="buttonStroke" :fill="buttonFill" />
    <text font-weight="bold" :stroke="buttonTextStroke" :fill="buttonTextFill" >Play</text>
    <rect x="-200" y="-50" width="400" height="100" opacity="0" class="clickable" @click="play" @mouseover="hoverPlay = true" @mouseout="hoverPlay = false" />
  </g>

</template>

<style lang="scss">
</style>
