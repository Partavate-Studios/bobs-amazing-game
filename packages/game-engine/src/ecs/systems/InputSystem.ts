import { System } from '../System'
import { Player } from '../components/Player'
import { Movement } from '../components/Movement'
import { Position } from '../components/Position'
import { Pushable } from '../components/Pushable'
import { Collectible } from '../components/Collectible'
import { Door } from '../components/Door'
import { Direction } from '../components/Movement'
import { CollisionSystem } from './CollisionSystem'

/**
 * InputSystem - Handles player input and movement commands
 */
export class InputSystem extends System {
  private collisionSystem: CollisionSystem

  constructor(world: any, collisionSystem: CollisionSystem) {
    super(world)
    this.collisionSystem = collisionSystem
  }

  /**
   * Turn player in a direction
   */
  turn(direction: Direction): void {
    const playerEntity = this.getPlayerEntity()
    if (!playerEntity) return

    const movement = this.world.getComponent<Movement>(playerEntity, Movement)
    if (movement && !movement.isMoving) {
      movement.direction = direction
    }
  }

  /**
   * Move player in a direction
   */
  move(direction: Direction): void {
    const playerEntity = this.getPlayerEntity()
    if (!playerEntity) return

    const player = this.world.getComponent<Player>(playerEntity, Player)
    const position = this.world.getComponent<Position>(playerEntity, Position)
    const movement = this.world.getComponent<Movement>(playerEntity, Movement)

    if (!player || !position || !movement) return

    // Check if already moving
    if (movement.isMoving) return

    // Turn first
    this.turn(direction)

    // Check if can move
    if (!this.collisionSystem.canMove(playerEntity, direction)) {
      return
    }

    // Get target location
    const target = this.collisionSystem.getTargetLocation(position, direction)
    const targetEntity = this.collisionSystem.getEntityAt(target.x, target.y)

    // Handle different target types
    if (targetEntity) {
      const pushable = this.world.getComponent<Pushable>(targetEntity, Pushable)
      const collectible = this.world.getComponent<Collectible>(targetEntity, Collectible)
      const door = this.world.getComponent<Door>(targetEntity, Door)

      if (pushable) {
        // Push the crate
        const targetPosition = this.world.getComponent<Position>(targetEntity, Position)
        if (targetPosition) {
          const targetOfTarget = this.collisionSystem.getTargetLocation(targetPosition, direction)
          
          // Animate crate movement
          const crateMovement = this.world.getComponent<Movement>(targetEntity, Movement)
          if (crateMovement) {
            crateMovement.startMove(targetOfTarget, 600, () => {
              // Update position after animation completes
              targetPosition.setLocation(targetOfTarget)
              player.movingTarget = false
            })
          } else {
            // If no movement component, just update position
            targetPosition.setLocation(targetOfTarget)
          }
          player.movingTarget = true
        }
      }

      if (collectible) {
        // Collect the key
        player.grabbingKey = true
        player.hasKey = true
        movement.startMove(target, 600, () => {
          this.handleCollectKey(targetEntity)
        })
        return
      }

      if (door && player.hasKey) {
        // Open the door
        player.openingDoor = true
        const doorComponent = this.world.getComponent<Door>(targetEntity, Door)
        if (doorComponent) {
          // Animate door opening (1 = closed, 0 = open)
          const startTime = Date.now()
          const duration = 600
          const animateDoor = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(1, elapsed / duration)
            doorComponent.openProgress = 1 - progress
            
            if (progress < 1) {
              requestAnimationFrame(animateDoor)
            } else {
              doorComponent.openProgress = 0
              doorComponent.isOpen = true
            }
          }
          animateDoor()
        }
        movement.startMove(target, 600, () => {
          this.handleOpenDoor(player)
        })
        return
      }
    }

    // Regular movement
    position.setLocation(target)
    movement.startMove(target, 600)
  }

  private handleCollectKey(keyEntity: any): void {
    const playerEntity = this.getPlayerEntity()
    if (!playerEntity) return

    const player = this.world.getComponent<Player>(playerEntity, Player)
    if (player) {
      player.grabbingKey = false
    }

    // Remove the key entity
    this.world.removeEntity(keyEntity)
  }

  private handleOpenDoor(player: Player): void {
    player.openingDoor = false
    player.won = true
  }

  private getPlayerEntity(): any {
    const players = this.world.getComponents<Player>(Player)
    if (players.length === 0) return null
    return this.world.getAllEntities().find(e => {
      const p = this.world.getComponent<Player>(e, Player)
      return p && p.entityId === e.id
    })
  }

  update(_deltaTime: number): void {
    // Input system doesn't need per-frame updates
    // It's used on-demand for input handling
  }
}

