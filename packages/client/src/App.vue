<script setup lang="ts">
import svgContainer from './svgContainer.vue'
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
      counter: 0
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
  }    
}

</script>


<template>
  <svgContainer>
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
  </svgContainer>
</template>
