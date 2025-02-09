<script setup lang="ts">
import bob from "../assets/bob.svg.vue"
import floor from "../assets/floor.svg.vue"
import wall from "../assets/wall.svg.vue"
import { useWorld } from "../stores/world.ts"
</script>

<script lang="ts">
export default {
  data() {
    return {
      world: useWorld(),
    };
  },
  methods: {
  },
  beforeMount() {
    this.world.initializeMap();
  }
};
</script>

<template>
  <g v-for="(row, x) in world.map">
    <g v-for="(entitle, y) in world.map[x]">
      <g :transform="'translate(' + (x - y) * 64 + ' ' + ((x + y) * 32 - 32 * (world.size-1)) + ')'">
        <floor />
        <wall v-if="world.map[x][y] === 1" />
        <bob v-if="world.map[x][y] === 2" :direction="world.direction" />
      </g>
    </g>
  </g>
  <g transform="translate(-550 -350)">
    <circle cx="-15" cy="-15" r="15" @click="world.move('up')" class="clickable" />
    <circle cx="-15" cy="15" r="15" @click="world.move('left')" class="clickable"  />
    <circle cx="15" cy="-15" r="15" @click="world.move('right')" class="clickable"  />
    <circle cx="15" cy="15" r="15" @click="world.move('down')" class="clickable"  />
  </g>

</template>

<style lang="scss">
</style>
