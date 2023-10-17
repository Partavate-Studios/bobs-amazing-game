import { defineStore } from 'pinia'

export const useMap = defineStore('map', {
  state: () => {
    return {
      size: 8,
      ground: [] as number[][],
      entities: [] as Bobject[]
    }
  },    
  getters: {
  },
  actions: {
    init() {

        for (let x = 0; x < this.size; x++) {
            this.ground[x] = []
            for (let y = 0; y < this.size; y++) {
              let type = 2;
              if ((x > 2) && (x < 6) && (y > 3) && (y < 7)) {
                type = 3;
              }              
              this.ground[x][y] = type;
            }
        }


        for (let x = 0; x < this.size; x++) {
          this.entities.push({
            type: 1,
            x: parseInt(x),
            y: parseInt(0),
            attributes: []
          })
          this.entities.push({
            type: 1,
            x: parseInt(0),
            y: parseInt(x),
            attributes: []
          })
        }

        for (let x = 1; x < this.size; x++) {
          this.entities.push({
            type: 1,
            x: parseInt(x),
            y: parseInt(this.size-1),
            attributes: []
          })
          this.entities.push({
            type: 1,
            x: parseInt(this.size-1),
            y: parseInt(x),
            attributes: []
          })          
        }
        this.entities.push({
          type: 5,
          x: 3,
          y: 2,
          attributes: []
        })
        this.entities.push({
          type: 0,
          x: 3,
          y: 3,
          attributes: []
        })
    }
  }
})


interface Bobject {
    type: number,
    x: number,
    y: number,
    attributes: number[],
}