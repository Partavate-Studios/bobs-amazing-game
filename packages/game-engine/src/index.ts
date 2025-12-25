/**
 * @bobs-game/game-engine
 * 
 * Entity Component System game engine for Vue 3
 */

// Core ECS
export { Entity } from './ecs/Entity'
export { Component } from './ecs/Component'
export { System } from './ecs/System'
export { World } from './ecs/World'

// Components (re-export for convenience)
export * from './ecs/components'

// Systems (re-export for convenience)
export * from './ecs/systems'

// Utils
export { mapToRenderLocation } from './utils/helpers'

// Types
export type { Location, RenderEntity } from './types'

