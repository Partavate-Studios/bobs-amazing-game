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
  <g stroke="#ffffff" stroke-width="4" stroke-opacity="0.15">
    <line x1="-64" y1="0" x2="0" y2="-32" />
    <line x1="64" y1="0" x2="0" y2="-32" />
    <line x1="-64" y1="0" x2="0" y2="32" />
    <line x1="64" y1="0" x2="0" y2="32" />
  </g>

  <g stroke="#ffffff" fill="#ffffff" stroke-width="1" fill-opacity="0.1" stroke-opacity="0.5">
    <path d="M -64 0 L 0 -32 L 64 0 L 0 32 L -64 0 Z" />
  </g>
</template>
