<script setup lang="ts">
</script>

<script lang="ts">
export default {
  data() {
    return {
    }
  },
  props: {
    size: {
      type: Number,
      default: 1
    },
  }
}
</script>

<template>
  <g transform="">
    <g stroke-opacity="0.1">
      <g transform="translate(0 0)">
        <ellipse cx="-80" cy="0" rx="550" ry="300" stroke-width="0" stroke="#000000" fill="url(#shadowGradient)"
          fill-opacity="0.5" />
      </g>
    </g>
    <g stroke-opacity="1" stroke-width="50" stroke-linecap="round">
        <path d="M-500 -400 L00 -150 L0 250 L-500 0 L-500 -400" fill="#302838" stroke="#302838" />
        <path d="M500 -400 L500 00 L0 250 L0 -150 L500 -400" fill="#605868" stroke="#605868" />
        <path d="M-500 -400 L00 -650 L500 -400 L0 -150 L-500 -400" fill="#888090" stroke="#886699" />
    </g>
  </g>
</template>

