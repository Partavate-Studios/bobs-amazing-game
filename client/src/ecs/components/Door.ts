import { Component } from '../Component'

/**
 * Door component - entities that are doors
 */
export class Door extends Component {
  public isOpen: boolean = false
  public openProgress: number = 1 // 1 = closed, 0 = open

  constructor(entityId: number) {
    super(entityId)
  }
}

