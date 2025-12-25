import { defineStore } from "pinia"
import { useTween } from '@/composables/tween.ts'
import { Direction } from '@/libs/enums.ts'
import { TerrainType } from '@/libs/enums.ts'
import { EntityType } from '@/libs/enums.ts'
import { mapToRenderLocation } from "@/libs/helpers.ts"
import type { Location } from '@/libs/interfaces.ts'
import type { RenderEntity } from '@/libs/interfaces.ts'


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
      movingTarget: false,
      grabbingKey: false,
      openingDoor: false,
      turns: [] as Direction[],
      hasKey: false,
      won: false
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
        this.entityMap[0][i] = EntityType.Bush
        this.entityMap[this.size-1][i] = EntityType.Bush
      }
      for (let i=1;i<this.size-1;i++) {
        this.entityMap[i][0] = EntityType.Bush
        this.entityMap[i][this.size-1] = EntityType.Bush
      }
      // Everything after this can be removed if we're loading map from data

      this.entityMap[2][2] = EntityType.Player
      this.entityMap[5][5] = EntityType.Crate
      this.entityMap[7][7] = EntityType.Crate
      this.entityMap[5][7] = EntityType.Crate
      this.entityMap[7][5] = EntityType.Crate
      this.entityMap[3][3] = EntityType.Key
      this.entityMap[0][5] = EntityType.Door
    },
    turn(direction:Direction) {
      if (this.playerMoving) return
      this.player.direction = direction
    },
    move(direction:Direction) {
      this.highlightMove=false
      if (this.playerMoving) return
      this.turn(direction)
      if (!this.canMove) return
      const player = this.playerLocation
      const target = this.targetLocation
      const targetOfTarget = this.targetOfTargetLocation
      
      if (this.targetMoveable) {
        this.entityMap[targetOfTarget.x][targetOfTarget.y] = this.entityMap[target.x][target.y]
        this.entityMap[target.x][target.y] = EntityType.Empty
        this.player.movingTarget = true
      }
      if (this.targetIsDoor && this.player.hasKey) {
        this.player.offset = useTween(1,0,this.turnTime,0,false,false, () => {this.updateMoveResults()})
        this.player.openingDoor = true
      }
      if (this.targetIsKey) {
        this.player.offset = useTween(1,0,this.turnTime,0,false,true, () => {this.updateMoveResults()})
        this.player.grabbingKey = true
        this.player.hasKey = true
        //setTimeout(() => {, this.turnTime);
      }
      if (this.targetMoveable || this.targetEmpty) {
        this.entityMap[player.x][player.y] = EntityType.Empty
        this.entityMap[target.x][target.y] = EntityType.Player
        this.player.offset = useTween(1,0,this.turnTime,0,false,false)
      }
      this.player.turns.push(direction)
      
    },
    updateMoveResults() {
      console.log('test')
      const target = this.targetLocation
      //remove key
      if (this.player.hasKey) {
        console.log('has key')
        if (this.targetIsKey) {
          console.log('removing key')          
          this.entityMap[target.x][target.y] = EntityType.Empty
        }
      }
      if (this.player.openingDoor) {
        this.player.won = true
      }
      this.player.grabbingKey = false
      this.player.movingTarget = false
      //
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
          const useOffset = (entity === EntityType.Player || 
            (entity === EntityType.Crate && this.player.movingTarget &&
              this.targetLocation.x === x && this.targetLocation.y === y)
          )
          return {
            type: entity,
            location: { x, y },
            coordinates: {
              x: useOffset ? base.x + this.playerOffset.x : base.x,
              y: useOffset ? base.y + this.playerOffset.y : base.y 
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
    targetOfTargetLocation():Location {
      let location = this.targetLocation

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
    targetOfTargetEmpty():boolean {
      const target = this.targetOfTargetLocation
      if ((target.x < 0) || (target.y < 0) || (target.x >= this.size) || (target.y >= this.size)) {
        return false
      }
      return (this.entityMap[target.x][target.y] === EntityType.Empty) 
    },
    targetMoveable():boolean {
      const location = this.targetLocation
      return (this.entityMap[location.x][location.y] === EntityType.Crate)
    },
    targetIsKey():boolean {
      const location = this.targetLocation
      return (this.entityMap[location.x][location.y] === EntityType.Key)
    },
    targetIsDoor():boolean {
      const location = this.targetLocation
      return (this.entityMap[location.x][location.y] === EntityType.Door)
    },
    canMove():boolean {      
      if (this.playerMoving) return false
      if (this.player.openingDoor) return false
      if (this.player.grabbingKey) return false
      if (this.targetEmpty) return true
      if (this.targetMoveable && this.targetOfTargetEmpty) return true
      if (this.targetIsKey) return true
      if (this.targetIsDoor && this.player.hasKey) return true
      return false
    },
    playerMoving():boolean {
      return (this.player.offset > 0)
    },
    showHighlightedMove():boolean {
      return (this.highlightMove && this.canMove) 
    },
    playerOffset():Location {
      let result = {
        x: 0,
        y: 0
      }
      if (this.player.grabbingKey) {
        result = {
          x: -32 * this.player.offset,
          y: -16 * this.player.offset
        }
      } else if (this.player.openingDoor) {
        result = {
          x: -32 + 32 * this.player.offset,
          y: -16 + 16 * this.player.offset
        }
      } else {
        result = {
          x: 64 * this.player.offset,
          y: 32 * this.player.offset
        }
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
    },
  },
});
