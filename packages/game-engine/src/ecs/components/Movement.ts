import { Component } from '../Component'
import type { Location } from '../../types'

/**
 * Direction enum for movement
 */
export enum Direction {
  Up = "U",
  Down = "D",
  Left = "L",
  Right = "R"
}

/**
 * Movement component - handles entity movement and animation
 */
export class Movement extends Component {
  public direction: Direction
  public offset: number = 0 // Animation offset (0-1)
  public targetLocation: Location | null = null
  public isMoving: boolean = false
  public moveStartTime: number = 0
  public moveDuration: number = 600
  public onComplete?: () => void

  constructor(entityId: number, direction: Direction = Direction.Down) {
    super(entityId)
    this.direction = direction
  }

  startMove(targetLocation: Location, duration: number = 600, onComplete?: () => void): void {
    this.targetLocation = targetLocation
    this.isMoving = true
    this.offset = 1
    this.moveStartTime = Date.now()
    this.moveDuration = duration
    this.onComplete = onComplete
  }

  updateOffset(currentTime: number): void {
    if (!this.isMoving || !this.targetLocation) return

    const elapsed = currentTime - this.moveStartTime
    const progress = Math.min(1, elapsed / this.moveDuration)
    this.offset = 1 - progress

    if (progress >= 1) {
      this.isMoving = false
      this.offset = 0
      if (this.onComplete) {
        this.onComplete()
        this.onComplete = undefined
      }
    }
  }

  stop(): void {
    this.isMoving = false
    this.offset = 0
    this.targetLocation = null
  }
}

