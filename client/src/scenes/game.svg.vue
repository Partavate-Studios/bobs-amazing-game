<script setup lang="ts">
import floor from "./game/floor.svg.vue"
import entities from "./game/entities.svg.vue"
import debug from "./game/debug.svg.vue"
import ui from "./game/ui.svg.vue"
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
  <floor />
  <entities />
  <ui />  
  <debug />
</template>

<style lang="scss"></style>
