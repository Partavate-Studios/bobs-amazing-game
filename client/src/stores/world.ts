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

interface RenderEntity {
  location: Location,
  coordinates: Location,
  type: EntityType
}

function mapToRenderLocation(x: number, y:number, mapSize:number):Location {
    return {
        x: (x - y) * 64,
        y: (x + y) * 32 - 32 * (mapSize -1) 
    }
}


export const useWorld = defineStore("world", {
  state: () => ({
    terrainMap: [] as TerrainType[][],
    entityMap: [] as EntityType[][],
    size: 10,
    turnTime: 600,
    highlightMove: false,
    player: {
      id: 0,
      direction: Direction.Down,
      offset: useTween(0,0,1,0,false,false),
    }
  }),
  actions: {
    initializeMap() {
      this.terrainMap = Array.from({ length: this.size }, () => 
        Array(this.size).fill(EntityType.Empty)
      )
      this.entityMap = Array.from({ length: this.size }, () => 
        Array(this.size).fill(EntityType.Empty)
      )

      for (let i=0;i<this.size;i++) {
        this.entityMap[0][i] = EntityType.Wall
        this.entityMap[this.size-1][i] = EntityType.Wall
      }
      for (let i=1;i<this.size-1;i++) {
        this.entityMap[i][0] = EntityType.Wall
        this.entityMap[i][this.size-1] = EntityType.Wall
      }
      // Everything after this can be removed if we're loading map from data

      this.entityMap[3][5] = EntityType.Player
      this.entityMap[8][7] = EntityType.Crate
    },
    turn(direction:Direction) {
      if (this.playerMoving) return
      this.player.direction = direction
    },
    move(direction:Direction) {
      this.highlightMove=false
      if (this.playerMoving) return
      this.turn(direction)
      if (!this.targetEmpty) return
      const target = this.targetLocation
      const player = this.playerLocation
      if (target) {
        this.entityMap[player.x][player.y] = EntityType.Empty
        this.entityMap[target.x][target.y] = EntityType.Player
        this.player.offset = useTween(1,0,this.turnTime,0,false,false)
      }
    }
  },
  getters: {
    playerLocation():Location {
      for (let x = 0; x < this.entityMap.length; x++) {
        for (let y = 0; y < this.entityMap[x].length; y++) {
          if (this.entityMap[x][y] === EntityType.Player) {
            return {x:x, y:y};
          }
        }
      }
      return {x:2, y:2}
    },
    entitiesSortedByY():RenderEntity[] {
      const flatMap = this.entityMap.flatMap((row: EntityType[], x:number) => 
        row.map((entity:EntityType, y:number) => {
          const base = mapToRenderLocation(x, y, this.size)
          return {
            type: entity,
            location: { x, y },
            coordinates: {
              x: entity === EntityType.Player ? base.x + this.playerOffset.x : base.x,
              y: entity === EntityType.Player ? base.y + this.playerOffset.y : base.y 
            }
          }
        })
      )
      return flatMap.sort((a:RenderEntity, b:RenderEntity) => {
        return a.coordinates.y - b.coordinates.y
      })
    },
    targetLocation():Location {
      let location = this.playerLocation

      switch(this.player.direction) {
        case Direction.Up: {
          return {x:location.x-1, y:location.y}
        }
        case Direction.Down: {
          return {x:location.x+1, y:location.y}
        }
        case Direction.Right: {
          return {x:location.x, y:location.y-1}
        }
        case Direction.Left: {
          return {x:location.x, y:location.y+1}
        }
      }
      return {x:-1, y:-1}
    },
    targetCoordinates():Location {
      const l = mapToRenderLocation(this.targetLocation.x, this.targetLocation.y, this.size)
      return {
        x: l.x,
        y: l.y
      }
    },
    targetEmpty():boolean {
      const target = this.targetLocation
      if ((target.x < 0) || (target.y < 0) || (target.x >= this.size) || (target.y >= this.size)) {
        return false
      }
      return (this.entityMap[target.x][target.y] === EntityType.Empty) 
    },
    playerMoving():boolean {
      return (this.player.offset > 0)
    },
    playerOffset():Location {
      let result = {
        x: 64 * this.player.offset,
        y: 32 * this.player.offset
      }
      if (this.player.offset > 0) {
        switch (this.player.direction) {
          case (Direction.Up): {
            break
          }
          case (Direction.Down): {
            result.x = result.x * -1
            result.y = result.y * -1
            break
          }
          case (Direction.Left): {
            result.y = result.y * -1
            break
          }
          case (Direction.Right): {
            result.x = result.x * -1
            break
          }
        }
      }
      return result
    }
  },
});
