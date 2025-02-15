<script setup lang="ts">
import svgContainer from './containers/svg.vue'
import { useRoute } from './stores/route.ts'
import game from './scenes/game.svg.vue'
import mainmenu from './scenes/mainmenu.svg.vue'
import { useClock } from "./stores/clock.ts"
const clock = useClock()
clock.play()
</script>

<script lang="ts">
export default {
  data() {
    return {
      route: useRoute(),
    }
  },
}
</script>

<template>

  <svgContainer>
    <mainmenu v-if="(route.current === 'mainmenu')" />
    <game v-if="(route.current === 'game')" />
  </svgContainer>

</template>

<style lang="scss">
body {
  font-family: 'Ubuntu', sans-serif;
  background: var(--color-bg);

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
}
#app {
  text-align: center;
}
.clickable:hover {
  cursor: pointer;
}
</style>


<style lang="scss">
//Default Theme
:root {
  --color-bg: #101010;
}
</style>
