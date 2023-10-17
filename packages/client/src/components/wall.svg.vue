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
    <g stroke="#ffffff" stroke-opacity="1" stroke-width="10" stroke-linecap="round">
        <path d="M-500 -400 L00 -150 L0 250 L-500 0 L-500 -400" fill="#331144" stroke="#331144" />
        <path d="M500 -400 L500 00 L0 250 L0 -150 L500 -400" fill="#662288" stroke="#662288" />
        <path d="M-500 -400 L00 -650 L500 -400 L0 -150 L-500 -400" fill="#8844aa" stroke="#8844aa" />
    </g>
  </g>
</template>

