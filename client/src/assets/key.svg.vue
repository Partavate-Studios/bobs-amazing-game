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
            default: 2
        },
    },
    methods: {
    }
}
</script>

<template>
    <g :transform="'scale(' + size + ')'">
  <ellipse
    cx="0"
    cy="0"
    rx="12"
    ry="6"
    stroke-width="0"
    stroke="#000000"
    fill="url(#shadowGradient)"
    fill-opacity="0.35"
    class="pulse"
  />
        <g transform="translate(-10 -20)">
            <g stroke-width="1" stroke-linecap="round" stroke="#000000" fill="#ffff88" class="bounce">
                <path
                    d="M4.28 20.28c-2.36 0-4.28-1.92-4.28-4.28s1.92-4.28 4.28-4.28c1.48 0 2.88 0.8 3.64 2.040h8c1.24 0 2.28 1 2.28 2.28 0 1.24-1 2.28-2.28 2.28-0.080 0-0.28 0.12-0.44 0.24-0.32 0.2-0.76 0.48-1.36 0.48s-1.040-0.28-1.36-0.48c-0.16-0.12-0.36-0.24-0.44-0.24s-0.28 0.12-0.44 0.24c-0.32 0.2-0.76 0.48-1.36 0.48s-1.040-0.28-1.36-0.48c-0.16-0.12-0.36-0.24-0.44-0.24h-0.8c-0.76 1.2-2.12 1.96-3.64 1.96zM4.28 13.36c-1.44 0-2.64 1.2-2.64 2.64s1.2 2.64 2.64 2.64c1.040 0 1.96-0.6 2.4-1.56 0.12-0.28 0.44-0.48 0.76-0.48h1.28c0.6 0 1.040 0.28 1.36 0.48 0.16 0.12 0.36 0.24 0.44 0.24s0.28-0.12 0.44-0.24c0.32-0.2 0.76-0.48 1.36-0.48s1.040 0.28 1.36 0.48c0.16 0.12 0.36 0.24 0.44 0.24s0.28-0.12 0.44-0.24c0.32-0.2 0.76-0.48 1.36-0.48 0.32 0 0.6-0.28 0.6-0.6s-0.28-0.6-0.6-0.6h-8.48c-0.32 0-0.6-0.2-0.76-0.48-0.4-0.96-1.36-1.56-2.4-1.56zM4.96 16c0 0.486-0.394 0.88-0.88 0.88s-0.88-0.394-0.88-0.88c0-0.486 0.394-0.88 0.88-0.88s0.88 0.394 0.88 0.88z">
                </path>
            </g>
        </g>

    </g>
</template>
<style>
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-3px);
  }
}
@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.9);
  }
}
.bounce {
    animation: bounce 2s infinite alternate ease-in-out;
}
.pulse {
    animation: pulse 2s infinite alternate ease-in-out;
}
</style>