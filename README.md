# Bob's Amazing Game AI

A Vue 3 game built with an Entity Component System (ECS) architecture.

## Structure

This is a monorepo containing:

- **`packages/game-engine/`** - Reusable ECS game engine (can be published to NPM)
- **`client/`** - Game implementation using the engine

## Quick Start

```bash
# Install all dependencies
npm install

# Build the engine
npm run build:engine

# Run the game
npm run dev
```

## Architecture

The game uses an Entity Component System (ECS) architecture:

- **Entities**: Unique identifiers for game objects
- **Components**: Data containers (Position, Movement, Renderable, etc.)
- **Systems**: Logic processors (MovementSystem, RenderSystem, etc.)

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture documentation.

## Engine Package

The game engine (`@bobs-game/game-engine`) is a separate, reusable package that can be:

- Published to NPM
- Used in multiple games
- Developed independently
- Versioned separately

### Using the Engine

```typescript
import { 
  World, 
  Entity,
  Position, 
  Movement, 
  Direction,
  MovementSystem,
  RenderSystem 
} from '@bobs-game/game-engine'

const world = new World()
const player = world.createEntity()
world.addComponent(player, new Position(player.id, 5, 5))
world.addComponent(player, new Movement(player.id, Direction.Down))
```

See [packages/game-engine/README.md](./packages/game-engine/README.md) for full documentation.

## Development

### Workspace Commands

```bash
# Build engine
npm run build:engine

# Type check all packages
npm run type-check

# Run client dev server
npm run dev
```

### Package-Specific Commands

```bash
# Engine package
cd packages/game-engine
npm run build
npm run dev  # Watch mode

# Client
cd client
npm run dev
npm run build
```

## Publishing

To publish the engine to NPM:

```bash
cd packages/game-engine
npm run build
npm publish
```

## License

MIT

