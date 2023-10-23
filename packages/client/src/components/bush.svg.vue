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
    green(input:number) {
        if (input % 2 == 0) {
            return '#88ff88'
        } else {
            return '#004400'
        }
    },
    color(input:number) {
        if (input % 3 == 0) {
          return '#aa2222'
        } else if (input % 3 == 1) {
          return '#aaaa22' 
        } else {
          return '#aa8822'
        }
    }
  }
}
</script>

<template>
  <g transform=""> 
    <defs>
        <clipPath id="bushend">            
            <path d="M-400 -600 L0 -800 L400 -600 L400 -300 L0 -100 L-400 -300 L-400 -600" />
        </clipPath>
      <radialGradient id="bushShadow">
        <stop offset="0%" stop-color="#000000" stop-opacity="0.5" />
        <stop offset="10%" stop-color="#000000" stop-opacity="0.5" />
        <stop offset="60%" stop-color="#000000" stop-opacity="0.1" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>
    </defs>
    <g stroke-opacity="0.1">
      <g transform="translate(0 0)">
        <ellipse cx="0" cy="5" rx="400" ry="200" stroke-width="0" stroke="#000000" fill="url(#bushShadow)"
          fill-opacity="1" />
      </g>
    </g>
    <ellipse v-for="n in 6" 
        :cx="(Math.floor(Math.random() * 500)) - 250" 
        :cy="(Math.floor(Math.random() * 250)) - 125" 
        :rx="(Math.floor(Math.random() * 10)) + 10" 
        :ry="(Math.floor(Math.random() * 5)) + 5" 
        :fill="color(n)"
        opacity="0.5"
    />
    <path d="M0 -300 L100 -300 L100 0 L0 50 L0 -300" fill="#664422" stroke="#443311" />
    <path d="M-100 -300 L0 -300 L0 50 L-100 0 L-100 -300" fill="#443311" stroke="#221100" />
    <g stroke-opacity="1" stroke-width="5" stroke-linecap="round">
        <path d="M-400 -600 L0 -400 L0 -100 L-400 -300 L-400 -600" fill="#115511" stroke="#226622" />
        <path d="M400 -600 L400 -300 L0 -100 L0 -400 L400 -600" fill="#226622" stroke="#338833" />
        <path d="M-400 -600 L0 -800 L400 -600 L0 -400 L-400 -600" fill="#33aa33" stroke="#55cc55" />
    </g>
    <circle v-for="n in 16" 
        :cx="(Math.floor(Math.random() * 1000)) - 500" 
        :cy="(Math.floor(Math.random() * 600)) - 800" 
        :r="(Math.floor(Math.random() * 100)) + 10" 
        :fill="green(n)"
        opacity="0.1"
        clip-path="url(#bushend)" 
    />
    <circle v-for="n in 6" 
        :cx="(Math.floor(Math.random() * 1000)) - 500" 
        :cy="(Math.floor(Math.random() * 600)) - 700" 
        :r="(Math.floor(Math.random() * 10)) + 20" 
        :fill="color(n)"
        opacity="0.5"
        clip-path="url(#bushend)" 
    />
  </g>
</template>

