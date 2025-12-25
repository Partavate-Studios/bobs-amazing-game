import { System } from '../System';
import { Position } from '../components/Position';
import type { Location } from '../../types';
/**
 * CollisionSystem - Handles collisions and interactions
 */
export declare class CollisionSystem extends System {
    private mapSize;
    constructor(world: any, mapSize: number);
    /**
     * Get entity at a specific grid location
     */
    getEntityAt(x: number, y: number): any;
    /**
     * Check if a location is empty
     */
    isLocationEmpty(x: number, y: number): boolean;
    /**
     * Get target location based on current position and direction
     */
    getTargetLocation(position: Position, direction: any): Location;
    /**
     * Check if player can move in a direction
     */
    canMove(playerEntity: any, direction: any): boolean;
    update(_deltaTime: number): void;
    setMapSize(size: number): void;
}
//# sourceMappingURL=CollisionSystem.d.ts.map