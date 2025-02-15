<script setup lang="ts"></script>

<script lang="ts">
export default {
  data() {
    return {};
  },
  props: {
    height: {
      type: Number,
      default: 40,
    },
  },
};
</script>

<template>
  <g stroke="#404040" fill="#888890" stroke-width="1" :transform="'translate(0 ' + (-1*height) + ')'">
    <path d="M -48 0 L 0 -24 L 48 0 L 0 24 L -48 -0 Z" />
  </g>
  <g stroke="#111111" fill="#444450">
    <path :d="'M -48 ' + (-1*height) + ' L 0 ' + (-1*height + 24) + ' L 0 32 L -64 0 L -48 ' + (-1*height) + ' Z'" />
  </g>
  <g stroke="#333333" fill="#666670">
    <path :d="'M 48 ' + (-1*height) + ' L 0 ' + (-1*height + 24) + ' L 0 32 L 64 0 L 48 ' + (-1*height) + ' Z'" />
  </g>




</template>
