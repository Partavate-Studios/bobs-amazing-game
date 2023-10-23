<script setup lang="ts">

</script>

<script lang="ts">
export default {
  data() {
    return {}
  },
  props: {
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    },
  },
}

</script>


<template>
    <g class="slides" :transform="'translate(' + 
            (((x - y) * 500)) 
            + ' ' + 
            (((x + y ) * 250)) 
            + ')'"
    >
      <g class="rolling">
        <slot />
      </g>
    </g>
</template>

<style scoped lang="scss">
.slides {
  transform: 10s linear;
}
</style>