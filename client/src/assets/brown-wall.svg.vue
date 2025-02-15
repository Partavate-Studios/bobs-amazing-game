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
  <g stroke="#404040" fill="#da6d00" stroke-width="1">
    <path d="M -64 -64 L 0 -96 L 64 -64 L 0 -32 L -64 -64 Z" />
  </g>
  <g stroke="#111111" fill="#4c2b0b">
    <path d="M -64 -64 L 0 -32 L 0 32 L -64 0 L -64 -64 Z" />
  </g>
  <g stroke="#333333" fill="#994b00">
    <path d="M 64 -64 L 0 -32 L 0 32 L 64 0 L 64 -64 Z" />
  </g>

  <g v-for="i in 3">
    <g transform="translate(-2 -2)">
        <line :x1="-64" :y1="-64 + i * 12" :x2="0" :y2="-32 + i * 12" stroke="#181818" />
        <line :x1="64" :y1="-64 + i * 12" :x2="0" :y2="-32 + i * 12" stroke="#282828" />
    </g>

    <g transform="translate(2 2)">
        <line :x1="-64" :y1="-64 + i * 12" :x2="0" :y2="-32 + i * 12" stroke="#303030" />
        <line :x1="64" :y1="-64 + i * 12" :x2="0" :y2="-32 + i * 12" stroke="#505050" />
    </g>
  </g>


  <g v-for="i in 4" transform="translate(0 -64)">
        <g transform="translate(-2 -2)" stroke-opacity="0.1" stroke-width="3">
        <line :x1="-64 + i * 16" :y1="0 + i * 8" :x2="0 + i * 16" :y2="-32 + i * 8" stroke="#222222" />
        <line :x1="64 - i * 16" :y1="0 + i * 8" :x2="0 - i * 16" :y2="-32 + i * 8" stroke="#222222" />
        </g>
        <g transform="translate(2 2)" stroke-opacity="0.1" stroke-width="3">
        <line :x1="-64 + i * 16" :y1="0 + i * 8" :x2="0 + i * 16" :y2="-32 + i * 8" stroke="#686868" />
        <line :x1="64 - i * 16" :y1="0 + i * 8" :x2="0 - i * 16" :y2="-32 + i * 8" stroke="#686868" />
        </g>
</g>

</template>
