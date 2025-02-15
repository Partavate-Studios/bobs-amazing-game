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
  <g stroke="#383838" fill="#605858" stroke-width="1">
    <path d="M -64 0 L 0 -32 L 64 0 L 0 32 L -64 0 Z" />
  </g>

  <g stroke="#303030" fill="#588858" stroke-width="0" opacity="0.35">
    <path d="M -64 0 L -32 -16 L 0 0 L -32 16 L -64 0 Z" />
    <path d="M 0 0 L 32 -16 L 64 0 L 32 16 L 0 0 Z" />
  </g>



  <g fill="#111111">
    <path d="M -64 0 L 0 32 L 0 64 L -64 32 L -64 0 Z" />
  </g>
  <g fill="#222222">
    <path d="M 64 0 L 0 32 L 0 64 L 64 32 L 64 0 Z" />
  </g>
</template>
