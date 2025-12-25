/**
 * Entity - A unique identifier for game objects
 */
export class Entity {
  private static nextId = 0
  public readonly id: number

  constructor() {
    this.id = Entity.nextId++
  }
}

