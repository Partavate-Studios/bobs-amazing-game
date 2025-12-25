import { Component } from '../Component'
import type { Location } from '@/libs/interfaces'

/**
 * Position component - stores grid position
 */
export class Position extends Component {
  public x: number
  public y: number

  constructor(entityId: number, x: number, y: number) {
    super(entityId)
    this.x = x
    this.y = y
  }

  setLocation(location: Location): void {
    this.x = location.x
    this.y = location.y
  }

  getLocation(): Location {
    return { x: this.x, y: this.y }
  }
}

