import { Entity } from './Entity';
import { Component } from './Component';
import { System } from './System';
/**
 * World - The main ECS container that manages entities, components, and systems
 */
export declare class World {
    private entities;
    private components;
    private systems;
    private componentTypes;
    /**
     * Create a new entity
     */
    createEntity(): Entity;
    /**
     * Remove an entity and all its components
     */
    removeEntity(entity: Entity): void;
    /**
     * Add a component to an entity
     */
    addComponent<T extends Component>(entity: Entity, component: T): T;
    /**
     * Remove a component from an entity
     */
    removeComponent(entity: Entity, componentType: any): void;
    /**
     * Get a component from an entity
     */
    getComponent<T extends Component>(entity: Entity, componentType: any): T | undefined;
    /**
     * Check if an entity has a component
     */
    hasComponent(entity: Entity, componentType: any): boolean;
    /**
     * Get all entities with a specific component type
     */
    getEntitiesWithComponent(componentType: any): Entity[];
    /**
     * Get all components of a specific type
     */
    getComponents<T extends Component>(componentType: any): T[];
    /**
     * Add a system to the world
     */
    addSystem(system: System): void;
    /**
     * Remove a system from the world
     */
    removeSystem(system: System): void;
    /**
     * Update all systems
     */
    update(deltaTime: number): void;
    /**
     * Get all entities
     */
    getAllEntities(): Entity[];
    /**
     * Clear all entities and components
     */
    clear(): void;
}
//# sourceMappingURL=World.d.ts.map