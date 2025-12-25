import { defineStore } from "pinia"
import { 
  World, 
  Entity,
  Position, 
  Movement, 
  Renderable, 
  Pushable, 
  Collectible, 
  Player, 
  Door,
  Direction,
  MovementSystem, 
  RenderSystem, 
  CollisionSystem, 
  InputSystem,
  mapToRenderLocation
} from '@bobs-game/game-engine'
import { EntityType } from '@/libs/enums'
import { useClock } from './clock'
import type { Location } from '@/libs/interfaces'
import type { RenderEntity } from '@/libs/interfaces'

export const useWorld = defineStore("world", {
  state: () => ({
    world: new World(),
    size: 10,
    turnTime: 600,
    highlightMove: false,
    playerEntity: null as Entity | null,
    lastUpdateTime: Date.now(),
    inputSystem: null as InputSystem | null,
    collisionSystem: null as CollisionSystem | null,
  }),
  actions: {
    initializeMap() {
      // Clear existing world
      this.world.clear()
      this.playerEntity = null

      // Create systems
      this.collisionSystem = new CollisionSystem(this.world, this.size)
      const renderSystem = new RenderSystem(this.world, this.size)
      const movementSystem = new MovementSystem(this.world)
      this.inputSystem = new InputSystem(this.world, this.collisionSystem)

      this.world.addSystem(this.collisionSystem)
      this.world.addSystem(renderSystem)
      this.world.addSystem(movementSystem)
      this.world.addSystem(this.inputSystem)

      // Create border bushes
      for (let i = 0; i < this.size; i++) {
        this.createEntity(EntityType.Bush, i, 0)
        this.createEntity(EntityType.Bush, i, this.size - 1)
      }
      for (let i = 1; i < this.size - 1; i++) {
        this.createEntity(EntityType.Bush, 0, i)
        this.createEntity(EntityType.Bush, this.size - 1, i)
      }

      // Create player
      this.playerEntity = this.createEntity(EntityType.Player, 2, 2, true)

      // Create crates
      this.createEntity(EntityType.Crate, 5, 5)
      this.createEntity(EntityType.Crate, 7, 7)
      this.createEntity(EntityType.Crate, 5, 7)
      this.createEntity(EntityType.Crate, 7, 5)

      // Create key
      this.createEntity(EntityType.Key, 3, 3)

      // Create door
      this.createEntity(EntityType.Door, 0, 5)

      // Start update loop
      this.startUpdateLoop()
    },

    createEntity(type: EntityType, x: number, y: number, isPlayer: boolean = false): Entity {
      const entity = this.world.createEntity()

      // Add position
      this.world.addComponent(entity, new Position(entity.id, x, y))

      // Add renderable
      this.world.addComponent(entity, new Renderable(entity.id, type))

      // Add movement for player
      if (isPlayer || type === EntityType.Player) {
        this.world.addComponent(entity, new Movement(entity.id, Direction.Down))
        this.world.addComponent(entity, new Player(entity.id))
      }

      // Add pushable for crates
      if (type === EntityType.Crate) {
        this.world.addComponent(entity, new Pushable(entity.id))
        this.world.addComponent(entity, new Movement(entity.id, Direction.Down))
      }

      // Add collectible for keys
      if (type === EntityType.Key) {
        this.world.addComponent(entity, new Collectible(entity.id))
      }

      // Add door component
      if (type === EntityType.Door) {
        this.world.addComponent(entity, new Door(entity.id))
      }

      return entity
    },

    startUpdateLoop() {
      const clock = useClock()
      const update = () => {
        if (clock.isRunning) {
          const currentTime = Date.now()
          const deltaTime = currentTime - this.lastUpdateTime
          this.world.update(deltaTime)
          this.lastUpdateTime = currentTime
          requestAnimationFrame(update)
        }
      }
      update()
    },

    turn(direction: Direction) {
      if (this.inputSystem) {
        this.inputSystem.turn(direction)
      }
    },

    move(direction: Direction) {
      this.highlightMove = false
      if (this.inputSystem) {
        this.inputSystem.move(direction)
      }
    },

    getDoorOpenProgress(entityId: number): number {
      const entity = this.world.getAllEntities().find(e => e.id === entityId)
      if (!entity) return 1
      
      const door = this.world.getComponent<Door>(entity, Door)
      return door ? door.openProgress : 1
    },
  },
  getters: {
    playerLocation(): Location {
      if (!this.playerEntity) return { x: 2, y: 2 }
      const position = this.world.getComponent<Position>(this.playerEntity, Position)
      if (!position) return { x: 2, y: 2 }
      return position.getLocation()
    },

    entitiesSortedByY(): RenderEntity[] {
      const renderables = this.world.getComponents<Renderable>(Renderable)
      const result: RenderEntity[] = []
      
      for (const renderable of renderables) {
        const entity = this.world.getAllEntities().find(e => e.id === renderable.entityId)
        if (!entity) continue

        const position = this.world.getComponent<Position>(entity, Position)
        if (!position) continue

        result.push({
          type: renderable.entityType,
          location: position.getLocation(),
          coordinates: renderable.renderCoordinates,
          entityId: entity.id
        })
      }
      
      return result.sort((a, b) => {
        // Sort by z-index if available, otherwise by Y coordinate
        const aEntity = this.world.getAllEntities().find(e => e.id === a.entityId)
        const bEntity = this.world.getAllEntities().find(e => e.id === b.entityId)
        if (aEntity && bEntity) {
          const aRenderable = this.world.getComponent<Renderable>(aEntity, Renderable)
          const bRenderable = this.world.getComponent<Renderable>(bEntity, Renderable)
          if (aRenderable && bRenderable) {
            return aRenderable.zIndex - bRenderable.zIndex
          }
        }
        return a.coordinates.y - b.coordinates.y
      })
    },

    targetLocation(): Location {
      if (!this.playerEntity || !this.collisionSystem) return { x: -1, y: -1 }
      const position = this.world.getComponent<Position>(this.playerEntity, Position)
      const movement = this.world.getComponent<Movement>(this.playerEntity, Movement)
      if (!position || !movement) return { x: -1, y: -1 }

      return this.collisionSystem.getTargetLocation(position, movement.direction)
    },

    targetCoordinates(): Location {
      const target = this.targetLocation
      return mapToRenderLocation(target.x, target.y, this.size)
    },

    targetEmpty(): boolean {
      const target = this.targetLocation
      if (!this.collisionSystem) return false
      return this.collisionSystem.isLocationEmpty(target.x, target.y)
    },

    targetMoveable(): boolean {
      const target = this.targetLocation
      if (!this.collisionSystem) return false

      const targetEntity = this.collisionSystem.getEntityAt(target.x, target.y)
      if (!targetEntity) return false

      return this.world.hasComponent(targetEntity, Pushable)
    },

    targetIsKey(): boolean {
      const target = this.targetLocation
      if (!this.collisionSystem) return false

      const targetEntity = this.collisionSystem.getEntityAt(target.x, target.y)
      if (!targetEntity) return false

      return this.world.hasComponent(targetEntity, Collectible)
    },

    targetIsDoor(): boolean {
      const target = this.targetLocation
      if (!this.collisionSystem) return false

      const targetEntity = this.collisionSystem.getEntityAt(target.x, target.y)
      if (!targetEntity) return false

      return this.world.hasComponent(targetEntity, Door)
    },

    canMove(): boolean {
      if (!this.playerEntity || !this.collisionSystem) return false
      const movement = this.world.getComponent<Movement>(this.playerEntity, Movement)
      if (movement && movement.isMoving) return false
      return this.collisionSystem.canMove(this.playerEntity, movement?.direction || Direction.Down)
    },

    playerMoving(): boolean {
      if (!this.playerEntity) return false
      const movement = this.world.getComponent<Movement>(this.playerEntity, Movement)
      return movement ? movement.isMoving : false
    },

    showHighlightedMove(): boolean {
      return this.highlightMove && this.canMove
    },

    player(): any {
      if (!this.playerEntity) {
        return {
          direction: Direction.Down,
          offset: 0,
          movingTarget: false,
          grabbingKey: false,
          openingDoor: false,
          hasKey: false,
          won: false
        }
      }

      const player = this.world.getComponent<Player>(this.playerEntity, Player)
      const movement = this.world.getComponent<Movement>(this.playerEntity, Movement)

      return {
        direction: movement?.direction || Direction.Down,
        offset: movement?.offset || 0,
        movingTarget: player?.movingTarget || false,
        grabbingKey: player?.grabbingKey || false,
        openingDoor: player?.openingDoor || false,
        hasKey: player?.hasKey || false,
        won: player?.won || false
      }
    },

    playerOffset(): Location {
      if (!this.playerEntity) return { x: 0, y: 0 }

      const player = this.world.getComponent<Player>(this.playerEntity, Player)
      const movement = this.world.getComponent<Movement>(this.playerEntity, Movement)
      const position = this.world.getComponent<Position>(this.playerEntity, Position)

      if (!movement || !position) return { x: 0, y: 0 }

      let result = { x: 0, y: 0 }
      const offset = movement.offset

      if (player?.grabbingKey) {
        result = {
          x: -32 * offset,
          y: -16 * offset
        }
      } else if (player?.openingDoor) {
        result = {
          x: -32 + 32 * offset,
          y: -16 + 16 * offset
        }
      } else {
        result = {
          x: 64 * offset,
          y: 32 * offset
        }
      }

      if (offset > 0) {
        switch (movement.direction) {
          case Direction.Up:
            break
          case Direction.Down:
            result.x = -result.x
            result.y = -result.y
            break
          case Direction.Left:
            result.y = -result.y
            break
          case Direction.Right:
            result.x = -result.x
            break
        }
      }

      return result
    },
  },
})
