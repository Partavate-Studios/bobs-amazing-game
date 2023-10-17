import {defineStore} from 'pinia'

export const useMap = defineStore('map', {
  state: () => {
    return {
      size: 8,
      ground: [] as number[][],
      entities: [] as Bobject[],
      playerEntity: 0 as number
    }
  },
  getters: {
    entitiesSorted():any[] {
        return this.entities.concat().sort((a,b) => 
          (a.x + a.y) - 
          (b.x + b.y)
        )
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

      this.ground[3][4] = 2


      this.entities.push({
        id: '',
        type: 0,
        x: 3,
        y: 3,
        attributes: []
    }) - 1


      for (let x = 0; x < this.size; x++) {
        this.entities.push({
          id: '',
          type: 1,
          x: parseInt(x),
          y: parseInt(0),
          attributes: []
        })
        this.entities.push({
                id: '',
                type: 1,
                x: parseInt(0),
                y: parseInt(x),
                attributes: []
            })
        }

        for (let x = 1; x < this.size; x++) {
            this.entities.push({
                id: '',
                type: 1,
                x: parseInt(x),
                y: parseInt(this.size - 1),
                attributes: []
            })
            this.entities.push({
                id: '',
                type: 1,
                x: parseInt(this.size - 1),
                y: parseInt(x),
                attributes: []
            })
        }
        this.entities.push({
            id: '',
            type: 5,
            x: 3,
            y: 2,
            attributes: []
        })


      },
      movePlayerUp() {
        this.entities[this.playerEntity].x -= 1;
      },
      movePlayerDown() {
        this.entities[this.playerEntity].x += 1;
      },
      movePlayerLeft() {
        this.entities[this.playerEntity].y -= 1;
      },
      movePlayerRight() {
        this.entities[this.playerEntity].y += 1;
      },
    }
})


interface Bobject {
    id: string,
    type: number,
    x: number,
    y: number,
    attributes: number[],
}