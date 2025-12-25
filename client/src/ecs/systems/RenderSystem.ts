import { System } from '../System'
import { Position } from '../components/Position'
import { Renderable } from '../components/Renderable'
import { Movement } from '../components/Movement'
import { Player } from '../components/Player'
import { Direction } from '@/libs/enums'
import { mapToRenderLocation } from '@/libs/helpers'
import type { Location } from '@/libs/interfaces'

/**
 * RenderSystem - Calculates render coordinates for all entities
 */
export class RenderSystem extends System {
  private mapSize: number

  constructor(world: any, mapSize: number) {
    super(world)
    this.mapSize = mapSize
  }

  update(deltaTime: number): void {
    const renderables = this.world.getComponents<Renderable>(Renderable)
    
    for (const renderable of renderables) {
      const entity = this.world.getAllEntities().find(e => e.id === renderable.entityId)
      if (!entity) continue

      const position = this.world.getComponent<Position>(entity, Position)
      if (!position) continue

      // Calculate base render coordinates
      const baseCoords = mapToRenderLocation(position.x, position.y, this.mapSize)
      
      // Apply movement offset if moving
      const movement = this.world.getComponent<Movement>(entity, Movement)
      let offsetX = 0
      let offsetY = 0

      if (movement && movement.isMoving && movement.targetLocation) {
        const offset = this.calculateMovementOffset(movement, position)
        offsetX = offset.x
        offsetY = offset.y
      }

      renderable.renderCoordinates = {
        x: baseCoords.x + offsetX,
        y: baseCoords.y + offsetY
      }

      // Calculate z-index based on Y position
      renderable.zIndex = position.y * 1000 + position.x
    }
  }

  private calculateMovementOffset(movement: Movement, position: Position): Location {
    const offset = movement.offset
    let result = { x: 0, y: 0 }

    // Check if this is the player entity
    const entity = this.world.getAllEntities().find(e => e.id === movement.entityId)
    if (!entity) return result

    const playerComponent = this.world.getComponent<Player>(entity, Player)
    
    if (playerComponent) {
      // Player-specific animations
      if (playerComponent.grabbingKey) {
        result = {
          x: -32 * offset,
          y: -16 * offset
        }
      } else if (playerComponent.openingDoor) {
        result = {
          x: -32 + 32 * offset,
          y: -16 + 16 * offset
        }
      } else {
        // Regular player movement
        result = {
          x: 64 * offset,
          y: 32 * offset
        }
      }
    } else {
      // Default movement for other entities (like crates)
      result = {
        x: 64 * offset,
        y: 32 * offset
      }
    }

    // Apply direction
    if (movement.direction === Direction.Down) {
      result.x = -result.x
      result.y = -result.y
    } else if (movement.direction === Direction.Left) {
      result.y = -result.y
    } else if (movement.direction === Direction.Right) {
      result.x = -result.x
    }

    return result
  }

  setMapSize(size: number): void {
    this.mapSize = size
  }
}

