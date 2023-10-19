<script setup lang="ts">
import svgContainer from './svgContainer.vue'
import {useMap} from './stores/worldmap'
import background from './components/background.svg.vue'
import bob from './components/bob.svg.vue'
import crate from './components/crate.svg.vue'
import empty from './components/empty.svg.vue'
import grass from './components/grass.svg.vue'
import grassColor from './components/grass-color.svg.vue'
import water from './components/water.svg.vue'
import wall from './components/wall.svg.vue'
import bush from './components/bush.svg.vue'
import btn from './components/button-basic.svg.vue'
import {setup} from "./mud/setup"
import mudConfig from "contracts/mud.config";
import isotile from './components/isotile.svg.vue'
</script>

<script lang="ts">
const {
  components,
  systemCalls: {increment},
  network,
} = await setup();

// https://vitejs.dev/guide/env-and-mode.html
/*
if (import.meta.env.DEV) {
  const { mount: mountDevTools } = await import("@latticexyz/dev-tools");
  mountDevTools({
    config: mudConfig,
    publicClient: network.publicClient,
    walletClient: network.walletClient,
    latestBlock$: network.latestBlock$,
    blockStorageOperations$: network.blockStorageOperations$,
    worldAddress: network.worldContract.address,
    worldAbi: network.worldContract.abi,
    write$: network.write$,
    recsWorld: network.world,
  });
}
*/
export default {
  data() {
    return {
      counter: 0,
      map: useMap()
    }
  },
  methods: {
    async update() {
      console.log("new counter value:", await increment());
    }
  },
  mounted() {
    components.Counter.update$.subscribe((update) => {
      const [nextValue, prevValue] = update.value;
      this.counter = nextValue?.value ?? 0
    });
    this.map.init()
  }
}

</script>


<template>
  <svgContainer>
    <background />

    <g transform="scale(0.2) translate(-3500 -2000)">
      <text transform="translate(0 -200)" fill="#000000">Counter</text>
      <g fill="#440088">
        <btn :width="520" :height="80" text="Increment" @click="update()" transform="translate(0 -100)" />
      </g>
      <text fill="#000000">{{ counter }}</text>
    </g>
    <g :transform="'scale(' + (1.5 / map.size) + ')'">
      <g :transform="'translate(0 ' + map.size * -220 + ')'">


        <g v-for="(row, x) in map.ground">
          <g v-for="(tile, y) in row">
            <isotile :x="x" :y="y">
              <grass v-if="tile == 1" />
              <water v-if="tile == 2" />
            </isotile>
          </g>
        </g>

        <g v-for="bobject in map.entitiesSorted" :key="bobject.id">
          <isotile :x="bobject.x" :y="bobject.y">
            <wall v-if="bobject.sprite == 'wall'" />
            <crate v-if="bobject.sprite == 'crate'" />
            <water v-if="bobject.sprite == 'water'" />
            <grass v-if="bobject.sprite == 'grass'" />
            <bush v-if="bobject.sprite == 'bush'" />
            <bob v-if="bobject.sprite == 'bob'" />
          </isotile>
        </g>
      </g>
    </g>
    <g transform="translate(-450 -300) rotate(45)">
      <rect x="-40" y="-80" rx="20" ry="20" width="80" height="80" fill="#6633aa" @click="map.movePlayerUp()" />
    </g>
    <g transform="translate(450 -300) rotate(45)">
      <rect x="-40" y="-80" rx="20" ry="20" width="80" height="80" fill="#6633aa" @click="map.movePlayerLeft()" />
    </g>
    <g transform="translate(-450 300) rotate(45)">
      <rect x="-40" y="-80" rx="20" ry="20" width="80" height="80" fill="#6633aa" @click="map.movePlayerRight()" />
    </g>
    <g transform="translate(450 300) rotate(45)">
      <rect x="-40" y="-80" rx="20" ry="20" width="80" height="80" fill="#6633aa" @click="map.movePlayerDown()" />
    </g>

  </svgContainer>
</template>
