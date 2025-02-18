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
  <g v-for="(row, x) in world.terrainMap">
    <g v-for="(entitle, y) in world.terrainMap[x]">
      <g :transform="'translate(' + (x - y) * 64 + ' ' + ((x + y) * 32 - 32 * (world.size - 1)) + ')'">
        <tile v-if="world.terrainMap[x][y] === TerrainType.Default" />
        <grass v-if="world.terrainMap[x][y] === TerrainType.Grass" />
      </g>
    </g>
  </g>

  <g v-if="world.showHighlightedMove" :transform="'translate(' + world.targetCoordinates.x + ' ' + world.targetCoordinates.y + ')'
    ">
    <glow />
  </g>
</template>

<style lang="scss"></style>
