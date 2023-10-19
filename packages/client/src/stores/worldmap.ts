import {defineStore} from 'pinia'
import { useEntities } from './composables/entities.ts'

export const useMap = defineStore('map', {
  state: () => {
    return {
      entities: useEntities(),
      size: 12 as number,
      entityIdNonce: 0,
      ground: [] as number[][],
      playerEntity: null as null | string
    }
  },
  getters: {
    entitiesSorted():any[] {
      console.log('getting sorted')
      //the concat forces a copy
      return this.entities.getSprites()
    }
  },
  actions: {
    init() {
      //fill in base assumptions
      for (let x = 0; x < this.size; x++) {
        this.ground[x] = []
        for (let y = 0; y < this.size; y++) {
          this.ground[x][y] = 1;
        }
      }
      //water example
      this.ground[3][4] = 2
      this.ground[2][5] = 2
      this.ground[2][4] = 2
      this.ground[3][5] = 2


      //player
      this.playerEntity = this.entities.spawn()
      this.entities.addLocation(this.playerEntity, {x: 3, y: 3})
      this.entities.addSprite(this.playerEntity, {sprite: 'bob'})

      //edges
      for (let x = 1; x < this.size - 1; x++) {
        const u = this.entities.spawn()
        this.entities.addLocation(u, {x: x, y:0})
        this.entities.addSprite(u, {sprite: 'bush'})

        const d = this.entities.spawn()
        this.entities.addLocation(d, {x: 0, y:x})
        this.entities.addSprite(d, {sprite: 'bush'})

        const l = this.entities.spawn()
        this.entities.addLocation(l, {x: this.size - 1, y:x})
        this.entities.addSprite(l, {sprite: 'bush'})

        const r = this.entities.spawn()
        this.entities.addLocation(r, {x: x, y: this.size -1})
        this.entities.addSprite(r, {sprite: 'bush'})
      }

      //example crate
      const crate = this.entities.spawn()
      this.entities.addLocation(crate, {x: 3, y: 2})
      this.entities.addSprite(crate, {sprite: 'crate'})
    },

    movePlayerUp() {
      this.entities.move(this.playerEntity,'u')
    },
    movePlayerDown() {
      this.entities.move(this.playerEntity,'d')
    },
    movePlayerLeft() {
      this.entities.move(this.playerEntity,'l')
    },
    movePlayerRight() {
      this.entities.move(this.playerEntity,'r')
    },
  }
})
