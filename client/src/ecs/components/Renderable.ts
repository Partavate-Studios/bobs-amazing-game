import { Component } from '../Component'
import { EntityType } from '@/libs/enums'
import type { Location } from '@/libs/interfaces'

/**
 * Renderable component - defines what should be rendered
 */
export class Renderable extends Component {
  public entityType: EntityType
  public renderCoordinates: Location = { x: 0, y: 0 }
  public zIndex: number = 0

  constructor(entityId: number, entityType: EntityType) {
    super(entityId)
    this.entityType = entityType
  }
}

