# Migration Guide: Engine Extraction

This document explains the new monorepo structure and how to use the extracted game engine.

## Structure

```
bobs-amazing-game-ai/
├── packages/
│   └── game-engine/          # The extracted ECS engine (NPM package)
│       ├── src/
│       │   ├── ecs/          # Core ECS (Entity, Component, System, World)
│       │   ├── components/   # Game components (Position, Movement, etc.)
│       │   ├── systems/      # Game systems (MovementSystem, etc.)
│       │   └── utils/        # Utility functions
│       └── package.json
├── client/                   # Your game implementation
│   └── src/
│       ├── stores/           # Pinia stores using the engine
│       ├── scenes/           # Vue components for rendering
│       └── libs/             # Game-specific types and enums
└── package.json              # Root workspace config
```

## Changes

### 1. Engine Package (`packages/game-engine`)

The ECS core is now a separate, reusable package that can be:
- Published to NPM
- Used in multiple projects
- Developed independently
- Versioned separately

### 2. Client Implementation (`client/`)

The game implementation now imports from the engine package:

```typescript
// Before
import { World } from '@/ecs/World'
import { Position } from '@/ecs/components'

// After
import { World, Position } from '@bobs-game/game-engine'
```

### 3. Workspace Setup

The root `package.json` uses npm workspaces to link packages:

```json
{
  "workspaces": [
    "packages/*",
    "client"
  ]
}
```

## Development Workflow

### Building the Engine

```bash
# Build the engine package
npm run build:engine

# Or from the engine directory
cd packages/game-engine
npm run build
```

### Using in Client

The client automatically uses the local engine package via workspace linking:

```bash
# Install dependencies (links workspace packages)
npm install

# Run the client
npm run dev
```

### Publishing the Engine

To publish the engine to NPM:

```bash
cd packages/game-engine
npm publish
```

Then update the client's `package.json` to use the published version:

```json
{
  "dependencies": {
    "@bobs-game/game-engine": "^0.1.0"
  }
}
```

## Benefits

1. **Separation of Concerns**: Engine logic is separate from game implementation
2. **Reusability**: Engine can be used in multiple games
3. **Versioning**: Engine and game can be versioned independently
4. **Testing**: Engine can be tested in isolation
5. **Distribution**: Engine can be published and shared

## Next Steps

1. Remove the old `client/src/ecs/` directory (now in engine package)
2. Update any remaining imports
3. Test the build process
4. Consider adding unit tests for the engine
5. Document the engine API

