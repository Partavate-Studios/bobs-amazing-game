<script setup lang="ts"></script>

<script lang="ts">
export default {
  data() {
    return {};
  },
  props: {
    open: {
      type: Number,
      default: 1,
    },
  },
};
</script>

<template>

<g v-if="open > 0">
    <path :d="'M-20 24 L' + 
      (-20 + 32*open) + ' ' + (24 - 16*open) + 'L' + 
      (-20 + 32*open) + ' ' + (-36 - 16*open) + ' L-20 -36 L-20 24'" stroke-width="1" stroke="#a8a8a8" fill="#558866" />
    <path :d="'M' + 
      (44 - 32*open) + ' ' + (-8 + 16*open) + ' L44 -8 L44 -68 L' + 
      (44 - 32*open) + ' ' + (-68 + 16*open) + ' L' + 
      (44 - 32*open) + ' ' + (-8 + 16*open)" stroke-width="1" stroke="#a8a8a8" fill="#558866" />
    <g v-if="open === 1">
    <ellipse cx="12" cy="-24" rx="3" ry="8" fill="#c8c8c8" transform="" />
    <ellipse cx="12" cy="-16" rx="3" ry="8" fill="#c8c8c8" transform="" />
    <ellipse cx="12" cy="-22" rx="2" ry="4" fill="#333333" transform="" />
    <ellipse cx="12" cy="-14" rx="1" ry="4" fill="#333333" transform="" />
    </g>
</g>





</template>
