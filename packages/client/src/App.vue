<script setup lang="ts">
import svgContainer from './svgContainer.vue'
import { useMap } from './stores/worldmap'
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
import { setup } from "./mud/setup"
import mudConfig from "contracts/mud.config";
</script>

<script lang="ts">
const {
  components,
  systemCalls: { increment },
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
    <btn      
      :width="520"
      :height="80"
      text="Increment"
      @click="update()"
      transform="translate(0 -100)"
    />
    </g>
    <text fill="#000000">{{ counter }}</text>
</g>
    <g transform="scale(0.15)">


      <g v-for="(row, x) in map.ground">
            <g v-for="(tile, y) in row">
                <g :transform="'translate(' + 
                        (((x - y) * 500)) 
                        + ' ' + 
                        (((x + y ) * 250) - 2500) 
                        + ')'"
                >
                  <grass v-if="tile == 2" />
                  <water v-if="tile == 3" />
                </g>
            </g>
        </g>

      <g v-for="bobject in map.bobjects">
        <g :transform="'translate(' + 
                (((bobject.x - bobject.y) * 500)) 
                + ' ' + 
                (((bobject.x + bobject.y ) * 250) - 2500) 
                + ')'"
        >
          <wall v-if="bobject.type == 6" />
          <crate v-if="bobject.type == 5" />
          <water v-if="bobject.type == 3" />
          <grass v-if="bobject.type == 2" />
          <bush v-if="bobject.type == 1" />
          <bob v-if="bobject.type == 0" />
        </g>
      </g>

    </g>
  </svgContainer>
</template>
