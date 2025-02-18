<script setup lang="ts">
import key from '../../assets/key.svg.vue'
import { useWorld } from '../../stores/world.ts'
import { EntityType } from '../../libs/enums.ts'
import { Direction } from '../../libs/enums.ts'
</script>

<script lang="ts">
export default {
  data() {
    return {
      world: useWorld(),
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
};
</script>

<template>
    <g v-if="world.player.won" transform="translate(400 250)">
      <text>You Win!</text>
    </g>
    <g v-if="world.player.hasKey" transform="translate(-400 -250) ">
      <key :size="2" :animate="false" />
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
  
</template>

<style lang="scss"></style>
