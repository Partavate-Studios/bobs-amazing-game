import { Component } from '../Component'

/**
 * Player component - marks an entity as the player
 */
export class Player extends Component {
  public hasKey: boolean = false
  public won: boolean = false
  public grabbingKey: boolean = false
  public openingDoor: boolean = false
  public movingTarget: boolean = false

  constructor(entityId: number) {
    super(entityId)
  }
}

