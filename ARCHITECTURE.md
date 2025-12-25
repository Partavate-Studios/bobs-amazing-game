# Architecture: Engine Package Structure

## Overview

The game has been refactored into a monorepo structure with a reusable game engine package that can be published to NPM and used across multiple projects.

## Package Structure

### `packages/game-engine/`

The core ECS engine, designed to be framework-agnostic (though currently optimized for Vue 3).

**Core Files:**
- `src/ecs/` - Core ECS architecture (Entity, Component, System, World)
- `src/ecs/components/` - Reusable components (Position, Movement, Renderable, etc.)
- `src/ecs/systems/` - Game systems (MovementSystem, RenderSystem, etc.)
- `src/utils/` - Utility functions (mapToRenderLocation, etc.)
- `src/types.ts` - Shared TypeScript types
- `src/index.ts` - Main entry point with all exports

**Build Configuration:**
- `vite.config.ts` - Vite build config for library mode
- `tsconfig.json` - TypeScript configuration
- `package.json` - Package metadata and exports

**Exports:**
```typescript
// Main entry
import { World, Entity, Component, System } from '@bobs-game/game-engine'

// Components
import { Position, Movement, Direction } from '@bobs-game/game-engine'

// Systems
import { MovementSystem, RenderSystem } from '@bobs-game/game-engine'

// Utils
import { mapToRenderLocation } from '@bobs-game/game-engine'
```

### `client/`

The game implementation that uses the engine package.

**Key Files:**
- `src/stores/world.ts` - Pinia store that uses the engine
- `src/scenes/` - Vue components for rendering
- `src/libs/` - Game-specific types and enums (EntityType, etc.)

## Design Principles

### 1. Separation of Concerns

- **Engine**: Generic, reusable ECS implementation
- **Game**: Specific game logic, rendering, and UI

### 2. Framework Agnostic Core

The ECS core doesn't depend on Vue. Only the integration layer (Pinia store) is Vue-specific.

### 3. Extensibility

- Add new components by extending `Component`
- Add new systems by extending `System`
- Game-specific logic stays in the game implementation

### 4. Type Safety

Full TypeScript support with proper type exports.

## Usage Example

```typescript
// In your game implementation
import { 
  World, 
  Entity,
  Position, 
  Movement, 
  Direction,
  MovementSystem,
  RenderSystem 
} from '@bobs-game/game-engine'

// Create world
const world = new World()

// Create entity
const player = world.createEntity()

// Add components
world.addComponent(player, new Position(player.id, 5, 5))
world.addComponent(player, new Movement(player.id, Direction.Down))

// Add systems
world.addSystem(new MovementSystem(world))
world.addSystem(new RenderSystem(world, 10))

// Update loop
function update() {
  world.update(deltaTime)
  requestAnimationFrame(update)
}
```

## Publishing

To publish the engine to NPM:

```bash
cd packages/game-engine
npm run build
npm publish
```

The package will be available as `@bobs-game/game-engine`.

## Development

### Local Development

Workspaces automatically link the packages:

```bash
# Install all dependencies
npm install

# Build engine
npm run build:engine

# Run client
npm run dev
```

### Adding New Features

1. **New Component**: Add to `packages/game-engine/src/ecs/components/`
2. **New System**: Add to `packages/game-engine/src/ecs/systems/`
3. **Export**: Update `packages/game-engine/src/index.ts`
4. **Use**: Import in `client/src/stores/world.ts`

## Benefits

1. **Reusability**: Use the engine in multiple games
2. **Maintainability**: Clear separation of engine vs. game code
3. **Testing**: Test engine independently
4. **Distribution**: Publish and version separately
5. **Collaboration**: Multiple teams can work on engine and games

