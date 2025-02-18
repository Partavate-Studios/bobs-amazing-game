<script setup lang="ts">
import bob from '../../assets/bob.svg.vue'
import wall from '../../assets/wall.svg.vue'
import crate from '../../assets/crate.svg.vue'
import bush from '../../assets/bush.svg.vue'
import glow from '../../assets/glow.svg.vue'
import key from '../../assets/key.svg.vue'
import door from '../../assets/door.svg.vue'

import { useWorld } from '../../stores/world.ts'
import { EntityType } from '../../libs/enums.ts'
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
  
    <g v-for="entity in world.entitiesSortedByY">
      <g :transform="'translate(' + entity.coordinates.x + ' ' + entity.coordinates.y + ')'">
        <wall v-if="entity.type === EntityType.Wall" />
        <crate v-if="entity.type === EntityType.Crate" />
        <bush v-if="entity.type === EntityType.Bush" />
        <door v-if="entity.type === EntityType.Door"
            :open="world.player.openingDoor ? world.player.offset : 1" />
        <key v-if="entity.type === EntityType.Key" 
            :size="(world.player.grabbingKey) ? world.player.offset * 3 + 0.5 : 1 "  />
        <g v-if="entity.type === EntityType.Player">
          <bob :walking="world.playerMoving" :direction="world.player.direction" />
        </g>
  
      </g>
    </g>
  
    <g opacity="0.25" v-if="world.showHighlightedMove" :transform="'translate(' + world.targetCoordinates.x + ' ' + world.targetCoordinates.y + ')'
      ">
      <glow />
    </g>
  
</template>

<style lang="scss"></style>
