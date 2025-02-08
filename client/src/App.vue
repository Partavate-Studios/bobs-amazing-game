<script setup lang="ts">
import svgContainer from './containers/svg.vue'
</script>

<template>

  <svgContainer>


  </svgContainer>

</template>

<style lang="scss">
body {
  font-family: 'Ubuntu', sans-serif;
  background: var(--color-bg);
  color: var(--color-light);

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
  --color-bg: #2222ff;
  --color-text: #ffffff;
  --color-btn-text: #000000;
}

//Orbiter 8 Theme
[data-theme="orbiter8"] {
  --color-bg: #000000;
  --color-light: #c3b3da;
  --color-btn: #ffffff;
}

//Test Theme
[data-theme="evil"] {
  --color-bg: #440000;
}
</style>
