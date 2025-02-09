import { defineStore } from "pinia"
import { useClock } from "./clock.ts"

export enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}

export enum Entities {
  Empty = 0,
  Wall = 1,
  Player = 2,
  Box = 3
}

interface Location {
  x: number,
  y: number
}

export const useWorld = defineStore("world", {
  state: () => ({
    clock: useClock(),
    map: [] as number[][],
    size: 12,
    player: {
      direction: Direction.Down,
      location: {
        x: -1,
        y: -1
      } as Location
    }
  }),
  actions: {
    initializeMap() {
      this.map = Array.from({ length: this.size }, () => Array(this.size).fill(Entities.Empty));
      // Everything after this can be removed if we're loading map from data
      this.map[0] = Array(this.size).fill(Entities.Wall);
      this.map[this.size - 1] = Array(this.size).fill(Entities.Wall);
      for (let i = 1; i + 1 < this.size; i++) {
        this.map[i][0] = Entities.Wall;
        this.map[i][this.size - 1] = Entities.Wall;
      }
      this.player.location = {x:8 , y:4}
      this.map[this.player.location.x][this.player.location.y] = Entities.Player;
    },
    move(direction:Direction) {
      this.player.direction = direction
      const target = this.targetLocation
      if (this.targetEmpty) {
        this.map[this.player.location.x][this.player.location.y] = Entities.Empty
        this.player.location = target
        this.map[this.player.location.x][this.player.location.y] = Entities.Player
      }
    }

  },
  getters: {
    playerLocation():Location {
      return this.player.location
    },
    targetLocation():Location {
      let target = this.player.location
      switch(this.player.direction) {
        case Direction.Up: {
          return {x: target.x-1, y: target.y}
        }
        case Direction.Down: {
            return {x: target.x+1, y: target.y}
        }
        case Direction.Right: {
            return {x: target.x, y: target.y-1}
        }
        case Direction.Left: {
            return {x: target.x, y: target.y+1}
        }
      }
      return target
    },
    targetEmpty():boolean {
      const target = this.targetLocation
      if ((target.x < 0) || (target.y < 0) || (target.x >= this.size) || (target.y >= this.size)) {
        return false
      }
      return (this.map[target.x][target.y] === Entities.Empty) 
    } 
  },
});
