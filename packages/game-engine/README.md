# @bobs-game/game-engine

Entity Component System (ECS) game engine for Vue 3 applications.

## Installation

```bash
npm install @bobs-game/game-engine
```

## Usage

```typescript
import { World, Entity, Position, Movement, Renderable } from '@bobs-game/game-engine'
import { MovementSystem, RenderSystem } from '@bobs-game/game-engine'

// Create a world
const world = new World()

// Create an entity
const player = world.createEntity()

// Add components
world.addComponent(player, new Position(player.id, 5, 5))
world.addComponent(player, new Movement(player.id, Direction.Down))
world.addComponent(player, new Renderable(player.id, EntityType.Player))

// Add systems
const movementSystem = new MovementSystem(world)
const renderSystem = new RenderSystem(world, 10)
world.addSystem(movementSystem)
world.addSystem(renderSystem)

// Update loop
function update() {
  world.update(deltaTime)
  requestAnimationFrame(update)
}
```

## Core Concepts

### Entities
Entities are unique identifiers for game objects. They don't contain data themselves.

### Components
Components are pure data containers. Examples:
- `Position` - stores x, y coordinates
- `Movement` - stores movement state and direction
- `Renderable` - stores rendering information

### Systems
Systems contain game logic and operate on entities with specific components:
- `MovementSystem` - updates movement animations
- `RenderSystem` - calculates render coordinates
- `CollisionSystem` - handles collisions
- `InputSystem` - processes input

## API

See the [full documentation](./docs/README.md) for detailed API reference.

## License

MIT

