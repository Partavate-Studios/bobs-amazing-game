<script setup lang="ts"></script>

<script lang="ts">
export default {
  data() {
    return {};
  },
  props: {
    height: {
      type: Number,
      default: 64,
    },
  },
};
</script>

<template>
  <g stroke="#777777" fill="#666666" stroke-width="1">
    <path d="M -64 -64 L 0 -96 L 64 -64 L 0 -32 L -64 -64 Z" />
  </g>
  <g stroke="#333333" fill="#222222">
    <path d="M -64 -64 L 0 -32 L 0 32 L -64 0 L -64 -64 Z" />
  </g>
  <g stroke="#555555" fill="#444444">
    <path d="M 64 -64 L 0 -32 L 0 32 L 64 0 L 64 -64 Z" />
  </g>
</template>
