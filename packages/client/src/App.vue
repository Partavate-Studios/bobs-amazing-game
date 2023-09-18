<script lang="ts">
import { setup } from "./mud/setup"
import mudConfig from "contracts/mud.config";

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
    <p>Vue Counter</p>
    <button @click="update()">Button</button>
    {{ counter }}
</template>
