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
    <g :transform="'translate(' + 
            (((x - y) * 500)) 
            + ' ' + 
            (((x + y ) * 250)) 
            + ')'"
    >
        <slot />
    </g>
</template>
