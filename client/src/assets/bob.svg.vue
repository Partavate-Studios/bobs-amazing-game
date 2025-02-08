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
  <radialGradient id="shadowGradient" >
    <stop offset="0%" stop-color="#000000"  stop-opacity="0.5"/>
    <stop offset="75%" stop-color="#000000"  stop-opacity="0.5"/>
    <stop offset="100%" stop-color="#000000"  stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="bobGradient"  cx="65%" cy="35%">
    <stop offset="0%" stop-color="#4444ff"  stop-opacity="1"/>
    <stop offset="50%" stop-color="#0000ff"  stop-opacity="1"/>
    <stop offset="90%" stop-color="#000088"  stop-opacity="1"/>
    <stop offset="100%" stop-color="#000066"  stop-opacity="1"/>
  </radialGradient>
  <radialGradient id="bootGradient"  cx="65%" cy="35%">
    <stop offset="0%" stop-color="#ffffff"  stop-opacity="1"/>
    <stop offset="30%" stop-color="#aa8800"  stop-opacity="1"/>
    <stop offset="95%" stop-color="#663300"  stop-opacity="1"/>
    <stop offset="100%" stop-color="#331100"  stop-opacity="1"/>
  </radialGradient>
  <radialGradient id="eyeGradient"  cx="68%" cy="60%">
    <stop offset="0%" stop-color="#000000"  stop-opacity="1"/>
    <stop offset="10%" stop-color="#000000"  stop-opacity="1"/>
    <stop offset="25%" stop-color="#8888ff"  stop-opacity="1"/>
    <stop offset="30%" stop-color="#ffffff"  stop-opacity="1"/>
    <stop offset="90%" stop-color="#888888"  stop-opacity="1"/>
    <stop offset="92%" stop-color="#000000"  stop-opacity="1"/>
    <stop offset="95%" stop-color="#000000"  stop-opacity="1"/>
    <stop offset="100%" stop-color="#0000ff"  stop-opacity="1"/>
  </radialGradient>


  <g transform="translate(0 0))">
      <ellipse
        cx="0"
        cy="0"
        rx="50"
        ry="20"
        stroke-width="0"
        stroke="#000000"
        fill="url(#shadowGradient)"
        fill-opacity="1" />
 </g>

  <g transform="translate(0 0)">
      <ellipse
        cx="30"
        cy="-5"
        rx="10"
        ry="8"
        stroke-width="1"
        stroke="#000000"
        fill="url(#bootGradient)"
        fill-opacity="1" />
</g>


<g transform="translate(0 0)">
      <circle
        cx="30"
        cy="-15"
        r="8"
        stroke-width="1"
        stroke="#000000"
        fill="url(#bobGradient)"
        fill-opacity="1" />
</g>

<g transform="translate(0 0)">
      <circle
        cy="-35"
        r="40"
        stroke-width="1"
        stroke="#000000"
        fill="url(#bobGradient)"
        fill-opacity="1" />
</g>

<g transform="translate(0 0)">
      <circle
        cx="28"
        cy="-45"
        r="9"
        stroke-width="1"
        stroke="#000000"
        fill="url(#eyeGradient)"
        fill-opacity="1" />
</g>



<g transform="translate(0 0)">
      <circle
        cx="22"
        cy="-30"
        r="10"
        stroke-width="1"
        stroke="#000088"
        fill="url(#bobGradient)"
        fill-opacity="1" />
</g>

<g transform="translate(0 0)">
      <circle
        cx="8"
        cy="-40"
        r="9"
        stroke-width="1"
        stroke="#000000"
        fill="url(#eyeGradient)"
        fill-opacity="1" />
</g>


<g transform="translate(0 0)">
      <ellipse
        cx="-30"
        cy="-5"
        rx="10"
        ry="8"
        stroke-width="1"
        stroke="#000000"
        fill="url(#bootGradient)"
        fill-opacity="1" />
</g>


<g transform="translate(0 0)">
      <circle
        cx="-30"
        cy="-15"
        r="8"
        stroke-width="1"
        stroke="#000000"
        fill="url(#bobGradient)"
        fill-opacity="1" />
</g>

<g transform="translate(0 0)">
      <ellipse
        cx="-2"
        cy="7"
        rx="11"
        ry="8"
        stroke-width="1"
        stroke="#000000"
        fill="url(#bootGradient)"
        fill-opacity="1" />
</g>



<g transform="translate(0 0)">
      <circle
        cx="-2"
        cy="-3"
        r="8"
        stroke-width="1"
        stroke="#000000"
        fill="url(#bobGradient)"
        fill-opacity="1" />
</g>


</template>

