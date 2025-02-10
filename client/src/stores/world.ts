import { defineStore } from "pinia"
import { useTween } from '../composables/tween.ts'

export enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}

export enum TerrainType {
  Default = 0,
  Water = 1,
  Grass = 2
}

export enum EntityType {
  Empty = 0,
  Wall = 1,
  Player = 2,
  Crate = 3,
  Bush = 4
}


interface Location {
  x: number,
  y: number
}

interface Entity {
    id: number,
    location: Location,
    type: EntityType
}

function mapToRenderLocation(entity:Entity, mapSize:number):Location {
    return {
        x: (entity.location.x - entity.location.y) * 64,
        y: (entity.location.x + entity.location.y -1) * 32 * (mapSize -1) 
    }
}


export const useWorld = defineStore("world", {
  state: () => ({
    terrainMap: [] as number[][],
    entities: [] as Entity[],
    size: 10,
    player: {
      id: 0,
      direction: Direction.Down,
      offset: useTween(0,0,1,0,false,false),
    }
  }),
  actions: {
    initializeMap() {
      this.terrainMap = Array.from({ length: this.size }, () => Array(this.size).fill(EntityType.Empty));
      for (let i=0;i<this.size;i++) {
        this.entities.push({
          id: this.entities.length,
          location: { x:0, y: i },
          type: EntityType.Wall
        })
        this.entities.push({
          id: this.entities.length,
          location: { x:this.size-1, y: i },
          type: EntityType.Wall
        })
      }
      for (let i=1;i<this.size-1;i++) {
        this.entities.push({
          id: this.entities.length,
          location: { x:i, y: 0 },
          type: EntityType.Wall
        })
        this.entities.push({
          id: this.entities.length,
          location: { x:i, y: this.size-1 },
          type: EntityType.Wall
        })
      }
      // Everything after this can be removed if we're loading map from data

      this.player.id = this.entities.push({
        id: this.entities.length,
        location: { x:4, y: 4 },
        type: EntityType.Player
      })
      this.entities.push({
        id: this.entities.length,
        location: { x:4, y: 7 },
        type: EntityType.Bush
      })
    },
    move(direction:Direction) {
      if (this.playerMoving) { 
        return
      }
      this.player.direction = direction
      const target = this.targetLocation
      if (this.targetEmpty) {
        this.entities[this.playerIndex].location = target
        this.player.offset = useTween(1,0,1000,0,false,false)
      }
    }
  },
  getters: {
    entitiesSortedByY():Entity[] {
      const sorter = function (a, b) {
        return 
      }
      return this.entities.sort((a:Enity, b:Entity) => {
        return mapToRenderLocation(a,this.size).y - mapToRenderLocation(b, this.size).y
      })
    },
    playerIndex():number {
      return this.entities.findIndex(entity => 
        entity.type === EntityType.Player
      )
    },
    playerLocation():Location {
      return this.entities[this.playerIndex].location
    },
    targetLocation():Location {
      let target = this.playerLocation
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
      return (this.terrainMap[target.x][target.y] === EntityType.Empty) 
    },
    playerMoving():boolean {
      return (this.player.offset > 0)
    },
    playerOffset():Location {
      let result = {x:0, y:0}
      if (this.player.offset > 0) {
        switch (this.player.direction) {
          case (Direction.Up): {
            result.x = 64 * this.player.offset
            result.y = 32 * this.player.offset
            break
          }
          case (Direction.Down): {
            result.x = -64 * this.player.offset
            result.y = -32 * this.player.offset
            break
          }
          case (Direction.Left): {
            result.x = 64 * this.player.offset
            result.y = -32 * this.player.offset
            break
          }
          case (Direction.Right): {
            result.x = -64 * this.player.offset
            result.y = 32 * this.player.offset
            break
          }
        }
      }
      return result
    } 
  },
});
