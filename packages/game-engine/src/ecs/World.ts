import { Entity } from './Entity'
import { Component } from './Component'
import { System } from './System'

/**
 * World - The main ECS container that manages entities, components, and systems
 */
export class World {
  private entities: Set<Entity> = new Set()
  private components: Map<number, Map<typeof Component, Component>> = new Map()
  private systems: System[] = []
  private componentTypes: Map<typeof Component, Set<number>> = new Map()

  /**
   * Create a new entity
   */
  createEntity(): Entity {
    const entity = new Entity()
    this.entities.add(entity)
    return entity
  }

  /**
   * Remove an entity and all its components
   */
  removeEntity(entity: Entity): void {
    const components = this.components.get(entity.id)
    if (components) {
      // Remove from component type indices
      for (const [componentType] of components.entries()) {
        const entitySet = this.componentTypes.get(componentType)
        if (entitySet) {
          entitySet.delete(entity.id)
        }
      }
      this.components.delete(entity.id)
    }
    this.entities.delete(entity)
  }

  /**
   * Add a component to an entity
   */
  addComponent<T extends Component>(entity: Entity, component: T): T {
    let entityComponents = this.components.get(entity.id)
    if (!entityComponents) {
      entityComponents = new Map()
      this.components.set(entity.id, entityComponents)
    }

    entityComponents.set(component.constructor as any, component)

    // Update component type index
    const componentType = component.constructor as any
    let entitySet = this.componentTypes.get(componentType)
    if (!entitySet) {
      entitySet = new Set()
      this.componentTypes.set(componentType, entitySet)
    }
    entitySet.add(entity.id)

    return component
  }

  /**
   * Remove a component from an entity
   */
  removeComponent(entity: Entity, componentType: any): void {
    const entityComponents = this.components.get(entity.id)
    if (entityComponents) {
      entityComponents.delete(componentType)
      
      // Update component type index
      const entitySet = this.componentTypes.get(componentType)
      if (entitySet) {
        entitySet.delete(entity.id)
      }
    }
  }

  /**
   * Get a component from an entity
   */
  getComponent<T extends Component>(entity: Entity, componentType: any): T | undefined {
    const entityComponents = this.components.get(entity.id)
    if (!entityComponents) {
      return undefined
    }
    return entityComponents.get(componentType) as T | undefined
  }

  /**
   * Check if an entity has a component
   */
  hasComponent(entity: Entity, componentType: any): boolean {
    const entityComponents = this.components.get(entity.id)
    if (!entityComponents) {
      return false
    }
    return entityComponents.has(componentType)
  }

  /**
   * Get all entities with a specific component type
   */
  getEntitiesWithComponent(componentType: any): Entity[] {
    const entitySet = this.componentTypes.get(componentType)
    if (!entitySet) {
      return []
    }
    return Array.from(entitySet)
      .map(id => Array.from(this.entities).find(e => e.id === id))
      .filter((e): e is Entity => e !== undefined)
  }

  /**
   * Get all components of a specific type
   */
  getComponents<T extends Component>(componentType: any): T[] {
    const entities = this.getEntitiesWithComponent(componentType)
    return entities
      .map(entity => this.getComponent<T>(entity, componentType))
      .filter((c): c is T => c !== undefined)
  }

  /**
   * Add a system to the world
   */
  addSystem(system: System): void {
    this.systems.push(system)
    if (system.init) {
      system.init()
    }
  }

  /**
   * Remove a system from the world
   */
  removeSystem(system: System): void {
    const index = this.systems.indexOf(system)
    if (index !== -1) {
      if (system.destroy) {
        system.destroy()
      }
      this.systems.splice(index, 1)
    }
  }

  /**
   * Update all systems
   */
  update(deltaTime: number): void {
    for (const system of this.systems) {
      system.update(deltaTime)
    }
  }

  /**
   * Get all entities
   */
  getAllEntities(): Entity[] {
    return Array.from(this.entities)
  }

  /**
   * Clear all entities and components
   */
  clear(): void {
    this.entities.clear()
    this.components.clear()
    this.componentTypes.clear()
  }
}

