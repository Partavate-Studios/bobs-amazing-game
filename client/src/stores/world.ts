import { defineStore } from "pinia";

export const useWorld = defineStore("world", {
  state: () => ({
    map: [] as number[][],
    size: 12,
    direction: 'down'
  }),
  actions: {
    initializeMap() {
      this.map = Array.from({ length: this.size }, () => Array(this.size).fill(0));
      this.map[0] = Array(this.size).fill(1);
      this.map[this.size - 1] = Array(this.size).fill(1);
      for (let i = 1; i + 1 < this.size; i++) {
        this.map[i][0] = 1;
        this.map[i][this.size - 1] = 1;
      }
      this.map[4][8] = 2;
    },
    setCellValue(row: number, col: number, value: number) {
      if (this.map[row] && this.map[row][col] !== undefined) {
        this.map[row][col] = value;
      }
    },
    move(direction:string) {
      let target = {x:0,y:0}
      let original = {x:0,y:0}
      for (let row = 0; row < this.map.length; row++) {
        const col = this.map[row].indexOf(2);
        if (col !== -1) {
            target.x = row
            original.x = row
            target.y = col
            original.y = col
        }
      }
      this.direction = direction
      switch (direction) {        
        case 'up': {
          target.x--
          break
        }
        case 'down': {
          target.x++
          break;
        }
        case 'right': {
          target.y--
          break;
        }
        case 'left': {
          target.y++
          break;
        }
      }
      if (this.map[target.x][target.y] === 0) {
        this.map[target.x][target.y] = 2
        this.map[original.x][original.y] = 0
      }
    }
  },
  getters: {
    playerLocation(): {x:number, y:number} {
      for (let row = 0; row < this.map.length; row++) {
        const col = this.map[row].indexOf(2);
        if (col !== -1) {
          return {x:row, y:col}; // Return the first occurrence of the value
        }
      }
      return {x: -1, y: -1}; // Return null if not found
    },
  },
});
