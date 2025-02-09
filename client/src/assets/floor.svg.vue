<script setup lang="ts"></script>

<script lang="ts">
export default {
  data() {
    return {};
  },
  props: {
    size: {
      type: Number,
      default: 1,
    },
  },
};
</script>

<template>
  <g stroke="#007744" fill="#007744" stroke-width="1">
    <path d="M -64 0 L 0 -32 L 64 0 L 0 32 L -64 0 Z" />
  </g>
  <g fill="#554400">
    <path d="M -64 0 L 0 32 L 0 64 L -64 32 L -64 0 Z" />
  </g>
  <g fill="#665511">
    <path d="M 64 0 L 0 32 L 0 64 L 64 32 L 64 0 Z" />
  </g>
</template>
