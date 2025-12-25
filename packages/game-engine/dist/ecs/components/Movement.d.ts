import { Component } from '../Component';
import type { Location } from '../../types';
/**
 * Direction enum for movement
 */
export declare enum Direction {
    Up = "U",
    Down = "D",
    Left = "L",
    Right = "R"
}
/**
 * Movement component - handles entity movement and animation
 */
export declare class Movement extends Component {
    direction: Direction;
    offset: number;
    targetLocation: Location | null;
    isMoving: boolean;
    moveStartTime: number;
    moveDuration: number;
    onComplete?: () => void;
    constructor(entityId: number, direction?: Direction);
    startMove(targetLocation: Location, duration?: number, onComplete?: () => void): void;
    updateOffset(currentTime: number): void;
    stop(): void;
}
//# sourceMappingURL=Movement.d.ts.map