import { System } from '../System'
import { Position } from '../components/Position'
import { Movement } from '../components/Movement'
import { Player } from '../components/Player'
import { Pushable } from '../components/Pushable'
import { Collectible } from '../components/Collectible'
import { Door } from '../components/Door'
import { Renderable } from '../components/Renderable'
import { EntityType } from '@/libs/enums'
import type { Location } from '@/libs/interfaces'

/**
 * CollisionSystem - Handles collisions and interactions
 */
export class CollisionSystem extends System {
  private mapSize: number

  constructor(world: any, mapSize: number) {
    super(world)
    this.mapSize = mapSize
  }

  /**
   * Get entity at a specific grid location
   */
  getEntityAt(x: number, y: number): any {
    if (x < 0 || y < 0 || x >= this.mapSize || y >= this.mapSize) {
      return null
    }

    const positions = this.world.getComponents<Position>(Position)
    for (const position of positions) {
      if (position.x === x && position.y === y) {
        const entity = this.world.getAllEntities().find(e => e.id === position.entityId)
        return entity
      }
    }
    return null
  }

  /**
   * Check if a location is empty
   */
  isLocationEmpty(x: number, y: number): boolean {
    if (x < 0 || y < 0 || x >= this.mapSize || y >= this.mapSize) {
      return false
    }
    return this.getEntityAt(x, y) === null
  }

  /**
   * Get target location based on current position and direction
   */
  getTargetLocation(position: Position, direction: any): Location {
    switch (direction) {
      case 'U':
        return { x: position.x - 1, y: position.y }
      case 'D':
        return { x: position.x + 1, y: position.y }
      case 'L':
        return { x: position.x, y: position.y + 1 }
      case 'R':
        return { x: position.x, y: position.y - 1 }
      default:
        return { x: position.x, y: position.y }
    }
  }

  /**
   * Check if player can move in a direction
   */
  canMove(playerEntity: any, direction: any): boolean {
    const player = this.world.getComponent<Player>(playerEntity, Player)
    const position = this.world.getComponent<Position>(playerEntity, Position)
    const movement = this.world.getComponent<Movement>(playerEntity, Movement)

    if (!player || !position) return false
    if (movement && movement.isMoving) return false
    if (player.openingDoor || player.grabbingKey) return false

    const target = this.getTargetLocation(position, direction)
    const targetEntity = this.getEntityAt(target.x, target.y)

    // Empty space - can move
    if (!targetEntity) return true

    // Check if target is pushable
    const pushable = this.world.getComponent<Pushable>(targetEntity, Pushable)
    if (pushable) {
      const targetOfTarget = this.getTargetLocation(
        this.world.getComponent<Position>(targetEntity, Position)!,
        direction
      )
      return this.isLocationEmpty(targetOfTarget.x, targetOfTarget.y)
    }

    // Check if target is collectible
    const collectible = this.world.getComponent<Collectible>(targetEntity, Collectible)
    if (collectible) return true

    // Check if target is door
    const door = this.world.getComponent<Door>(targetEntity, Door)
    if (door && player.hasKey) return true

    return false
  }

  update(deltaTime: number): void {
    // Collision system doesn't need per-frame updates
    // It's used on-demand for movement checks
  }

  setMapSize(size: number): void {
    this.mapSize = size
  }
}

