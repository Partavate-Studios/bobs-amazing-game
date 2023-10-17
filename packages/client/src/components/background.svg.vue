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
      <stop offset="10%" stop-color="#223322" />
      <stop offset="80%" stop-color="#334433" />
    </linearGradient>
  </defs>

<rect :x="screen.left" :y="screen.top" :width="screen.width" :height="screen.height" fill="url(#bggradient)" />
</template>

<style scoped>
</style>
