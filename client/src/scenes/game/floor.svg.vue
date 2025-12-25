<script setup lang="ts">
import tile from "../../assets/tile.svg.vue"
import grass from "../../assets/grass.svg.vue"
import glow from "../../assets/glow.svg.vue"
import { useWorld } from "../../stores/world.ts"
import { TerrainType } from "../../libs/enums.ts"
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
  }

};
</script>

<template>
  <!-- Generate floor tiles based on map size -->
  <g v-for="x in Array(world.size).fill(0).map((_, i) => i)" :key="'row-' + x">
    <g v-for="y in Array(world.size).fill(0).map((_, i) => i)" :key="'tile-' + x + '-' + y">
      <g :transform="'translate(' + (x - y) * 64 + ' ' + ((x + y) * 32 - 32 * (world.size - 1)) + ')'">
        <grass />
      </g>
    </g>
  </g>
</template>

<style lang="scss"></style>
