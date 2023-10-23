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
  },
  methods: {
    color(input: number) {
      if (input % 3 == 0) {
        return '#008800'
      } else if (input % 3 == 1) {
        return '#004400'
      } else {
        return '#22ff22'
      }
    }
  }
}
</script>

<template>
  <g transform="translate(0 0)">

    <g stroke-width="5" stroke-linecap="round">
      <path d="M-500 100 L0 350 L0 650 L-500 400 L-500 100"  fill="#602818" stroke="#602818"/>
      <path d="M0 350 L500 100 L500 400 L0 650 L0 350"  fill="#903820" stroke="#903820"/>
    </g>

    <g stroke-width="5" stroke-linecap="round" fill="#114411" stroke="#114411" >
      <path d="M-500 0 L0 250 L0 350 L-500 100 L-500 0"/>
      <path d="M0 250 L500 0 L500 100 L0 350 L0 250"/>
    </g>

    <g stroke-width="10" stroke-linecap="round" fill="#228822" stroke="#228822">
      <path d="M-500 0 L0 -250 L500 0 L0 250 L-500 0" />
    </g>

    <ellipse v-for="n in 10" :cx="(Math.floor(Math.random() * 600)) - 300" :cy="(Math.floor(Math.random() * 300)) - 150"
      :rx="(Math.floor(Math.random() * 20)) + 20" :ry="(Math.floor(Math.random() * 10)) + 10" :fill="color(n)"
      opacity="0.05" />

  </g>
</template>

