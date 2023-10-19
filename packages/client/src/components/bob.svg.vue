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
  <defs>
    <radialGradient id="bobGradient" cx="60%" cy="30%">
      <stop offset="0%" stop-color="#2222ff" stop-opacity="1" />
      <stop offset="10%" stop-color="#0000ff" stop-opacity="1" />
      <stop offset="40%" stop-color="#0000ff" stop-opacity="1" />
      <stop offset="90%" stop-color="#0000aa" stop-opacity="1" />
      <stop offset="100%" stop-color="#000088" stop-opacity="1" />
    </radialGradient>
    <radialGradient id="bootGradient" cx="65%" cy="35%">
      <stop offset="0%" stop-color="#aa8800" stop-opacity="1" />
      <stop offset="30%" stop-color="#aa8800" stop-opacity="1" />
      <stop offset="95%" stop-color="#663300" stop-opacity="1" />
      <stop offset="100%" stop-color="#331100" stop-opacity="1" />
    </radialGradient>
    <radialGradient id="eyeLidGradient" cx="68%" cy="60%">
      <stop offset="0%" stop-color="#4444ff" stop-opacity="1" />
      <stop offset="70%" stop-color="#0000aa" stop-opacity="1" />
      <stop offset="90%" stop-color="#2222ff" stop-opacity="1" />
      <stop offset="100%" stop-color="#0000aa" stop-opacity="1" />
    </radialGradient>
    <radialGradient id="eyeGradient" cx="68%" cy="60%">
      <stop offset="0%" stop-color="#000000" stop-opacity="1" />
      <stop offset="10%" stop-color="#000000" stop-opacity="1" />
      <stop offset="25%" stop-color="#8888ff" stop-opacity="1" />
      <stop offset="30%" stop-color="#ffffff" stop-opacity="1" />
      <stop offset="90%" stop-color="#888888" stop-opacity="1" />
      <stop offset="100%" stop-color="#0000aa" stop-opacity="1" />
    </radialGradient>
    <clipPath id="eyeClip">
      <circle cx="30" cy="40" r="90" fill="#ffffff" fill-opacity="1" />
    </clipPath>
  </defs>

  <g stroke-opacity="0.1">
    <g transform="translate(0 0)">
      <ellipse cx="0" cy="50" rx="500" ry="200" stroke-width="0" stroke="#000000" fill="url(#shadowGradient)"
        fill-opacity="1" />
    </g>

    <g transform="translate(0 0)">
      <ellipse cx="300" cy="0" rx="100" ry="80" stroke-width="10" stroke="#000000" fill="url(#bootGradient)"
        fill-opacity="1" />
    </g>


    <g transform="translate(0 0)">
      <circle cx="300" cy="-100" r="80" stroke-width="10" stroke="#000000" fill="url(#bobGradient)" fill-opacity="1" />
    </g>

    <g transform="translate(0 0)">
      <circle cy="-300" r="400" stroke-width="10" stroke="#000000" fill="url(#bobGradient)" fill-opacity="1" />
    </g>

    <g transform="translate(0 0)">
      <circle cx="270" cy="-420" r="100" stroke-width="10" stroke="#000044" fill="url(#eyeLidGradient)"
        fill-opacity="1" />
    </g>
    <g transform="translate(280 -400)">
      <circle cx="0" cy="0" r="90" stroke-width="10" stroke="#000044" fill="url(#eyeGradient)" fill-opacity="1" 
        clip-path="url(#eyeClip)" />
    </g>



    <g transform="translate(0 0)">
      <circle cx="220" cy="-250" r="100" stroke-width="10" stroke="#000088" fill="url(#bobGradient)" fill-opacity="1" />
    </g>

    <g transform="translate(0 0)">
      <circle cx="70" cy="-370" r="100" stroke-width="10" stroke="#000044" fill="url(#eyeLidGradient)" fill-opacity="1" />
    </g>
    <g transform="translate(80 -350)">
      <circle cx="0" cy="0" r="90" stroke-width="10" stroke="#000044" fill="url(#eyeGradient)" fill-opacity="1"
        clip-path="url(#eyeClip)" />
    </g>


    <g transform="translate(0 0)">
      <ellipse cx="-300" cy="0" rx="100" ry="80" stroke-width="10" stroke="#000000" fill="url(#bootGradient)"
        fill-opacity="1" />
    </g>


    <g transform="translate(0 0)">
      <circle cx="-300" cy="-100" r="80" stroke-width="10" stroke="#000000" fill="url(#bobGradient)" fill-opacity="1" />
    </g>

    <g transform="translate(0 0)">
      <ellipse cx="-20" cy="120" rx="110" ry="80" stroke-width="10" stroke="#000000" fill="url(#bootGradient)"
        fill-opacity="1" />
    </g>



    <g transform="translate(0 0)">
      <circle cx="-20" cy="20" r="80" stroke-width="10" stroke="#000000" fill="url(#bobGradient)" fill-opacity="1" />
    </g>

  </g>
</template>

