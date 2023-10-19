<script setup lang="ts">
import { useScreen } from '../stores/screen'
</script>


<script lang="ts">
export default {
  data() {
    return {
      screen: useScreen(),
    }
  },
}
</script>

<template>
<defs>
    <linearGradient id="bggradient" x1="50%" x2="50%" y1="0%" y2="100%">
      <stop offset="0%" stop-color="#111118" />
      <stop offset="5%" stop-color="#000000" />
      <stop offset="95%" stop-color="#000000" />
      <stop offset="100%" stop-color="#181111" />
    </linearGradient>
  </defs>

<rect :x="screen.left" :y="screen.top" :width="screen.width" :height="screen.height" fill="url(#bggradient)" />
</template>

<style scoped>
</style>
