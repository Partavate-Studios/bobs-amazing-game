import { Component } from '../Component'

/**
 * Collectible component - entities that can be collected (like keys)
 */
export class Collectible extends Component {
  public collected: boolean = false

  constructor(entityId: number) {
    super(entityId)
  }
}

