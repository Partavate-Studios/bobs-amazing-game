import { Component } from '../Component'
import type { Location } from '../../types'

/**
 * Renderable component - defines what should be rendered
 * entityType is a generic number/identifier that the game implementation defines
 */
export class Renderable extends Component {
  public entityType: number
  public renderCoordinates: Location = { x: 0, y: 0 }
  public zIndex: number = 0

  constructor(entityId: number, entityType: number) {
    super(entityId)
    this.entityType = entityType
  }
}

