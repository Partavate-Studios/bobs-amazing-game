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
  <g stroke="#ff8888" stroke-opacity="0.25">
    <line x1="0" y1="-192" x2="0" y2="192" stroke-opacity="0.1" />
    <line x1="-192" y1="0" x2="192" y2="0" stroke-opacity="0.1" />

    <line x1="-64" y1="-80" x2="-64" y2="0" />
    <line x1="64" y1="-80" x2="64" y2="0" />

    <g transform="translate(0 -80)" stroke-opacity="0.1">
      <line x1="-64" y1="0" x2="0" y2="-32" />
      <line x1="64" y1="0" x2="0" y2="-32" />
      <line x1="-64" y1="0" x2="0" y2="32" />
      <line x1="64" y1="0" x2="0" y2="32" />
    </g>

    <g stroke="#ffffff" stroke-width="2" stroke-opacity="0.5">
      <line x1="-64" y1="0" x2="0" y2="-32" />
      <line x1="64" y1="0" x2="0" y2="-32" />
      <line x1="-64" y1="0" x2="0" y2="32" />
      <line x1="64" y1="0" x2="0" y2="32" />
    </g>
  </g>
</template>
