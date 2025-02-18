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
  <g stroke="#787070" fill="#605858" stroke-width="1">
    <path d="M -64 0 L 0 -32 L 64 0 L 0 32 L -64 0 Z" />
  </g>

  <g stroke="#303030" fill="#ffffff" stroke-width="0" opacity="0.05">
    <path d="M -64 0 L -32 -16 L 0 0 L -32 16 L -64 0 Z" />
    <path d="M 0 0 L 32 -16 L 64 0 L 32 16 L 0 0 Z" />
  </g>



  <g fill="#444450" stroke-width="0">
    <path d="M -64 0 L 0 32 L 0 64 L -64 32 L -64 0 Z" />
  </g>
  <g fill="#666670" stroke-width="0">
    <path d="M 64 0 L 0 32 L 0 64 L 64 32 L 64 0 Z" />
  </g>
</template>
