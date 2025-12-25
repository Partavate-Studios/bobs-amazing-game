import { System } from '../System'
import { Movement } from '../components/Movement'

/**
 * MovementSystem - Updates movement animations
 */
export class MovementSystem extends System {
  update(_deltaTime: number): void {
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

