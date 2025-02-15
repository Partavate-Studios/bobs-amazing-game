<script setup lang="ts">
import bob from "../assets/bob.svg.vue"
import floor from "../assets/floor.svg.vue"
import grass from "../assets/grass.svg.vue"
import wall from "../assets/wall.svg.vue"
import crate from "../assets/crate.svg.vue"
import bush from "../assets/bush.svg.vue"
import glow from "../assets/glow.svg.vue"
import { useClock } from "../stores/clock.ts"
import { useWorld } from "../stores/world.ts"
import { Direction } from "../stores/world.ts"
import { TerrainType } from "../stores/world.ts"
import { EntityType } from "../stores/world.ts"
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
    this.world.initializeMap();
  }

};
</script>

<template>
  <g v-for="(row, x) in world.terrainMap">
    <g v-for="(entitle, y) in world.terrainMap[x]">
      <g :transform="'translate(' + (x - y) * 64 + ' ' + ((x + y) * 32 - 32 * (world.size-1)) + ')'">
        <floor v-if="world.terrainMap[x][y] === TerrainType.Default" />
        <grass v-if="world.terrainMap[x][y] === TerrainType.Grass" />
      </g>
    </g>
  </g>

  <g v-if="world.targetEmpty && !world.playerMoving" :transform="
    'translate(' + world.targetCoordinates.x + ' ' + world.targetCoordinates.y + ')'
  ">
    <glow />
  </g>

  <g v-for="entity in world.entitiesSortedByY">
    <g :transform="'translate(' + entity.coordinates.x + ' ' + entity.coordinates.y + ')'">
        <wall v-if="entity.type === EntityType.Wall" />
        <crate v-if="entity.type === EntityType.Crate" />
        <bush v-if="entity.type === EntityType.Bush" />
        <g v-if="entity.type === EntityType.Player">
            <bob :walking="world.playerMoving" :direction="world.player.direction" />
        </g>

      </g>
  </g>
  <g transform="translate(-550 -350)">
    <circle cx="-15" cy="-15" r="15" @click="world.move(Direction.Up)" class="clickable" />
    <circle cx="-15" cy="15" r="15" @click="world.move(Direction.Left)" class="clickable"  />
    <circle cx="15" cy="-15" r="15" @click="world.move(Direction.Right)" class="clickable"  />
    <circle cx="15" cy="15" r="15" @click="world.move(Direction.Down)" class="clickable"  />
  </g>
  <g fill="#88ff88" font-size="26px">
  <text transform="translate(-500 260)">P x:{{ world.playerLocation.x }}, y:{{ world.playerLocation.y }}  </text>
  <text transform="translate(-500 300)">T x:{{ world.targetLocation.x }}, y:{{ world.targetLocation.y }}  </text>
  <text transform="translate(-500 340)">{{ world.player.direction }}</text>
  <text transform="translate(-500 380)">T: {{ clock.gameTimeInSeconds }}</text>
  </g>

</template>

<style lang="scss">
</style>
