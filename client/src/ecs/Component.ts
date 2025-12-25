/**
 * Component - Base class for all components
 * Components are pure data containers
 */
export abstract class Component {
  public entityId: number

  constructor(entityId: number) {
    this.entityId = entityId
  }
}

