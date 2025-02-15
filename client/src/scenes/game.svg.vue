<script setup lang="ts">
import bob from "../assets/bob.svg.vue"
import floor from "../assets/floor.svg.vue"
import grass from "../assets/grass.svg.vue"
import wall from "../assets/wall.svg.vue"
import crate from "../assets/crate.svg.vue"
import bush from "../assets/bush.svg.vue"
import glow from "../assets/glow.svg.vue"
import key from "../assets/key.svg.vue"
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
    hoverOn(Direction:Direction) {
      this.world.player.direction = Direction
      this.world.highlightMove = true
    },
    hoverOff() {
      this.world.highlightMove = false
    }
  },
  beforeMount() {
    this.world.initializeMap();
  }

};
</script>

<template>
  <g v-for="(row, x) in world.terrainMap">
    <g v-for="(entitle, y) in world.terrainMap[x]">
      <g :transform="'translate(' + (x - y) * 64 + ' ' + ((x + y) * 32 - 32 * (world.size - 1)) + ')'">
        <floor v-if="world.terrainMap[x][y] === TerrainType.Default" />
        <grass v-if="world.terrainMap[x][y] === TerrainType.Grass" />
      </g>
    </g>
  </g>

  <g v-if="world.showHighlightedMove" :transform="'translate(' + world.targetCoordinates.x + ' ' + world.targetCoordinates.y + ')'
    ">
    <glow />
  </g>

  <g v-for="entity in world.entitiesSortedByY">
    <g :transform="'translate(' + entity.coordinates.x + ' ' + entity.coordinates.y + ')'">
      <wall v-if="entity.type === EntityType.Wall" />
      <crate v-if="entity.type === EntityType.Crate" />
      <bush v-if="entity.type === EntityType.Bush" />
      <key v-if="entity.type === EntityType.Key" />
      <g v-if="entity.type === EntityType.Player">
        <bob :walking="world.playerMoving" :direction="world.player.direction" />
      </g>

    </g>
  </g>

  <g opacity="0.25" v-if="world.showHighlightedMove" :transform="'translate(' + world.targetCoordinates.x + ' ' + world.targetCoordinates.y + ')'
    ">
    <glow />
  </g>

  <g v-for="entity in world.entitiesSortedByY">
    <g v-if="entity.type === EntityType.Player && !world.playerMoving">
      <g :transform="'translate(' + entity.coordinates.x + ' ' + entity.coordinates.y + ')'">

        <g transform="translate(0 0)">
          <rect x="-128" y="-64" width="128" height="64" fill="#000000" opacity="0"
            @mouseover="hoverOn(Direction.Up)" @mouseout="hoverOff()"
            @click="world.move(Direction.Up)" class="clickable" />

          <rect x="-128" y="0" width="128" height="64" fill="#000000" opacity="0"
            @mouseover="hoverOn(Direction.Left)" @mouseout="hoverOff()"
            @click="world.move(Direction.Left)" class="clickable" />

          <rect x="0" y="-64" width="128" height="64" fill="#000000" opacity="0"
            @mouseover="hoverOn(Direction.Right)" @mouseout="hoverOff()"
            @click="world.move(Direction.Right)" class="clickable" />
            
          <rect x="0" y="0" width="128" height="64" fill="#000000" opacity="0"
            @mouseover="hoverOn(Direction.Down)" @mouseout="hoverOff()"
            @click="world.move(Direction.Down)" class="clickable" />
        </g>



      </g>
    </g>
  </g>

  <g v-if="world.targetEmpty && !world.playerMoving" :transform="'translate(' + world.targetCoordinates.x + ' ' + world.targetCoordinates.y + ')'
    ">

  </g>

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
