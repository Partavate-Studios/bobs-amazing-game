<script setup lang="ts">
import { Direction } from "../stores/world";
</script>

<script lang="ts">
export default {
  data() {
    return {};
  },
  props: {
    size: {
      type: Number,
      default: 1,
    },
    walking: {
      type: Boolean,
      default: false,
    },
    direction: {
      type: String,
      default: Direction.Down,
    },
  },
  computed: {
    oddMoveClass() {
      if (this.walking) {
        return "oddmove";
      }
      return "";
    },
    evenMoveClass() {
      if (this.walking) {
        return "evenmove";
      }
      return "";
    },
  },
};
</script>

<template>
  <radialGradient id="shadowGradient">
    <stop offset="0%" stop-color="#000000" stop-opacity="0.5" />
    <stop offset="75%" stop-color="#000000" stop-opacity="0.5" />
    <stop offset="100%" stop-color="#000000" stop-opacity="0" />
  </radialGradient>
  <radialGradient id="bobGradient" cx="65%" cy="35%">
    <stop offset="0%" stop-color="#4444ff" stop-opacity="1" />
    <stop offset="50%" stop-color="#0000ff" stop-opacity="1" />
    <stop offset="90%" stop-color="#000088" stop-opacity="1" />
    <stop offset="100%" stop-color="#000066" stop-opacity="1" />
  </radialGradient>
  <radialGradient id="bootGradient" cx="65%" cy="35%">
    <stop offset="0%" stop-color="#ffffff" stop-opacity="1" />
    <stop offset="30%" stop-color="#aa8800" stop-opacity="1" />
    <stop offset="95%" stop-color="#663300" stop-opacity="1" />
    <stop offset="100%" stop-color="#331100" stop-opacity="1" />
  </radialGradient>
  <radialGradient id="eyeGradientRight" cx="68%" cy="60%">
    <stop offset="0%" stop-color="#000000" stop-opacity="1" />
    <stop offset="10%" stop-color="#000000" stop-opacity="1" />
    <stop offset="25%" stop-color="#8888ff" stop-opacity="1" />
    <stop offset="30%" stop-color="#ffffff" stop-opacity="1" />
    <stop offset="90%" stop-color="#888888" stop-opacity="1" />
    <stop offset="92%" stop-color="#000000" stop-opacity="1" />
    <stop offset="95%" stop-color="#000000" stop-opacity="1" />
    <stop offset="100%" stop-color="#0000ff" stop-opacity="1" />
  </radialGradient>
  <radialGradient id="eyeGradientLeft" cx="32%" cy="60%">
    <stop offset="0%" stop-color="#000000" stop-opacity="1" />
    <stop offset="10%" stop-color="#000000" stop-opacity="1" />
    <stop offset="25%" stop-color="#8888ff" stop-opacity="1" />
    <stop offset="30%" stop-color="#ffffff" stop-opacity="1" />
    <stop offset="90%" stop-color="#888888" stop-opacity="1" />
    <stop offset="92%" stop-color="#000000" stop-opacity="1" />
    <stop offset="95%" stop-color="#000000" stop-opacity="1" />
    <stop offset="100%" stop-color="#0000ff" stop-opacity="1" />
  </radialGradient>

  <ellipse
    cx="0"
    cy="0"
    rx="50"
    ry="20"
    stroke-width="0"
    stroke="#000000"
    fill="url(#shadowGradient)"
    fill-opacity="1"
  />
  <g>
    <g v-if="direction === Direction.Up">
      <circle
        :class="evenMoveClass"
        cx="-32"
        cy="-50"
        r="10"
        stroke-width="1"
        stroke="#000088"
        fill="url(#eyeGradientLeft)"
        fill-opacity="1"
      />
    </g>

    <g v-if="direction === Direction.Right">
      <circle
        :class="evenMoveClass"
        cx="32"
        cy="-50"
        r="10"
        stroke-width="1"
        stroke="#000088"
        fill="url(#eyeGradientRight)"
        fill-opacity="1"
      />
    </g>

    <g v-if="direction === Direction.Down || direction === Direction.Up">
      <g :class="evenMoveClass">
        <ellipse
          :cx="30"
          cy="-5"
          rx="10"
          ry="8"
          stroke-width="1"
          stroke="#000000"
          fill="url(#bootGradient)"
          fill-opacity="1"
        />
        <circle
          cx="30"
          cy="-15"
          r="8"
          stroke-width="1"
          stroke="#000000"
          fill="url(#bobGradient)"
          fill-opacity="1"
        />
      </g>
    </g>
    <g v-if="direction === Direction.Left || direction === Direction.Right">
      <g :class="evenMoveClass">
        <ellipse
          :cx="-30"
          cy="-5"
          rx="10"
          ry="8"
          stroke-width="1"
          stroke="#000000"
          fill="url(#bootGradient)"
          fill-opacity="1"
        />
        <circle
          cx="-30"
          cy="-15"
          r="8"
          stroke-width="1"
          stroke="#000000"
          fill="url(#bobGradient)"
          fill-opacity="1"
        />
      </g>
    </g>

    <circle
      cy="-35"
      r="40"
      stroke-width="1"
      stroke="#000000"
      fill="url(#bobGradient)"
      fill-opacity="1"
    />

    <g v-if="direction === Direction.Down || direction === Direction.Up">
      <ellipse
        :class="evenMoveClass"
        cx="-30"
        cy="-5"
        rx="10"
        ry="8"
        stroke-width="1"
        stroke="#000000"
        fill="url(#bootGradient)"
        fill-opacity="1"
      />
      <circle
        :class="evenMoveClass"
        cx="-30"
        cy="-15"
        r="8"
        stroke-width="1"
        stroke="#000000"
        fill="url(#bobGradient)"
        fill-opacity="1"
      />
      <ellipse
        :class="oddMoveClass"
        cx="-2"
        cy="7"
        rx="11"
        ry="8"
        stroke-width="1"
        stroke="#000000"
        fill="url(#bootGradient)"
        fill-opacity="1"
      />

      <circle
        :class="oddMoveClass"
        cx="-2"
        cy="-3"
        r="8"
        stroke-width="1"
        stroke="#000000"
        fill="url(#bobGradient)"
        fill-opacity="1"
      />
    </g>

    <g v-if="direction === Direction.Right || direction === Direction.Left">
      <ellipse
        :class="evenMoveClass"
        cx="30"
        cy="-5"
        rx="10"
        ry="8"
        stroke-width="1"
        stroke="#000000"
        fill="url(#bootGradient)"
        fill-opacity="1"
      />
      <circle
        :class="evenMoveClass"
        cx="30"
        cy="-15"
        r="8"
        stroke-width="1"
        stroke="#000000"
        fill="url(#bobGradient)"
        fill-opacity="1"
      />
      <ellipse
        :class="oddMoveClass"
        cx="2"
        cy="7"
        rx="11"
        ry="8"
        stroke-width="1"
        stroke="#000000"
        fill="url(#bootGradient)"
        fill-opacity="1"
      />
      <circle
        :class="oddMoveClass"
        cx="2"
        cy="-3"
        r="8"
        stroke-width="1"
        stroke="#000000"
        fill="url(#bobGradient)"
        fill-opacity="1"
      />
    </g>

    <g v-if="direction === Direction.Down">
      <circle
        :class="evenMoveClass"
        cx="28"
        cy="-45"
        r="9"
        stroke-width="1"
        stroke="#000000"
        fill="url(#eyeGradientRight)"
        fill-opacity="1"
      />

      <circle
        cx="22"
        cy="-30"
        r="10"
        stroke-width="1"
        stroke="#0000ff"
        fill="url(#bobGradient)"
        fill-opacity="1"
      />

      <circle
        :class="oddMoveClass"
        cx="8"
        cy="-40"
        r="9"
        stroke-width="1"
        stroke="#000000"
        fill="url(#eyeGradientRight)"
        fill-opacity="1"
      />
    </g>

    <g v-if="direction === Direction.Left">
      <circle
        :class="evenMoveClass"
        cx="-28"
        cy="-45"
        r="9"
        stroke-width="1"
        stroke="#000000"
        fill="url(#eyeGradientLeft)"
        fill-opacity="1"
      />

      <circle
        cx="-22"
        cy="-30"
        r="10"
        stroke-width="1"
        stroke="#0000ff"
        fill="url(#bobGradient)"
        fill-opacity="1"
      />

      <circle
        :class="oddMoveClass"
        cx="-8"
        cy="-40"
        r="9"
        stroke-width="1"
        stroke="#000000"
        fill="url(#eyeGradientLeft)"
        fill-opacity="1"
      />
    </g>
  </g>
</template>

<style>
@keyframes oddbounce {
  0%,
  100% {
    transform: translateY(1px);
  }
  50% {
    transform: translateY(-1px);
  }
}

@keyframes evenbounce {
  0%,
  100% {
    transform: translateY(-1px);
  }
  50% {
    transform: translateY(1px);
  }
}

@keyframes doublebounce {
  0%,
  100% {
    transform: translateX(-1px);
  }
  50% {
    transform: translateX(1px);
  }
}

.oddmove {
  animation: oddbounce 0.15s infinite alternate ease-in-out;
}

.evenmove {
  animation: evenbounce 0.15s infinite alternate ease-in-out;
}

</style>
