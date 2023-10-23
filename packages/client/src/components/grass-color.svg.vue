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


<g transform="translate(0 0)">    
    <g stroke-width="5" stroke-linecap="round">
      <path d="M-500 0 L0 250 L0 450 L-500 200 L-500 0" fill="#114411" stroke="#114411" />
    </g>
    <g stroke-width="5" stroke-linecap="round">
      <path d="M0 250 L500 0 L500 200 L0 450 L0 250" fill="#116611" stroke="#116611" />
    </g>
    <g stroke-width="10" stroke-linecap="round">
      <path d="M-500 0 L0 -250 L500 0 L0 250 L-500 0" fill="#228822"  stroke="#228822" />
    </g>

    <ellipse v-for="n in 6" 
        :cx="(Math.floor(Math.random() * 500)) - 250" 
        :cy="(Math.floor(Math.random() * 250)) - 125" 
        :rx="(Math.floor(Math.random() * 10)) + 10" 
        :ry="(Math.floor(Math.random() * 5)) + 5" 
        :fill="color(n)"
        opacity="0.5"
    />

</g>


</template>

