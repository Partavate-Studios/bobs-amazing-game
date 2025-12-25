import { System } from '../System'
import { Position } from '../components/Position'
import { Movement } from '../components/Movement'
import { Player } from '../components/Player'
import { Direction } from '@/libs/enums'
import type { Location } from '@/libs/interfaces'

/**
 * MovementSystem - Updates movement animations
 */
export class MovementSystem extends System {
  update(deltaTime: number): void {
    const currentTime = Date.now()
    
    // Update all movement components
    const movements = this.world.getComponents<Movement>(Movement)
    for (const movement of movements) {
      if (movement.isMoving) {
        movement.updateOffset(currentTime)
      }
    }
  }
}

