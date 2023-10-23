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
    <g stroke="#442200" stroke-width="15" stroke-linecap="round">
      <path d="M-500 -600 L00 -850 L500 -600 L0 -350 L-500 -600" fill="#ffaa66" />
      <path d="M500 -600 L500 00 L0 250 L0 -350 L500 -600" fill="#aa6633" />
      <path d="M-500 -600 L00 -350 L0 250 L-500 0 L-500 -600" fill="#884411" />
    </g>

    <g stroke="#442200" stroke-width="20" stroke-linecap="round">
      <path d="M-400 -555 L-300 -505 L-300 105 L-400 55 L-400 -555" fill="#442200" />
      <path d="M-200 -455 L-100 -405 L-100 205 L-200 155 L-200 -455" fill="#442200" />
      <path d="M400 -555 L300 -505 L300 105 L400 50 L405 -555" fill="#663308" />
      <path d="M200 -455 L100 -405 L100 205 L200 150 L205 -455" fill="#663308" />

      <path d="M-400 -555 L-300 -505 L200 -755 L100 -805 L-400 -555" fill="#884411" />
      <path d="M-200 -455 L-100 -405 L400 -655 L300 -705 L-200 -455" fill="#884411" />
      <path d="M400 -555 L300 -505 L-200 -755 L-100 -805 L400 -555" fill="#884411" />
      <path d="M200 -455 L100 -405 L-400 -655 L-300 -705 L200 -455" fill="#884411" />
    </g>
  </g>
</template>

