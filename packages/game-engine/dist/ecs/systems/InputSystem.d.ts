import { System } from '../System';
import { Direction } from '../components/Movement';
import { CollisionSystem } from './CollisionSystem';
/**
 * InputSystem - Handles player input and movement commands
 */
export declare class InputSystem extends System {
    private collisionSystem;
    constructor(world: any, collisionSystem: CollisionSystem);
    /**
     * Turn player in a direction
     */
    turn(direction: Direction): void;
    /**
     * Move player in a direction
     */
    move(direction: Direction): void;
    private handleCollectKey;
    private handleOpenDoor;
    private getPlayerEntity;
    update(_deltaTime: number): void;
}
//# sourceMappingURL=InputSystem.d.ts.map