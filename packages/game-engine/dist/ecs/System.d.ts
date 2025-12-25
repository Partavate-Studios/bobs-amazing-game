import type { World } from './World';
/**
 * System - Base class for all systems
 * Systems contain game logic and operate on entities with specific components
 */
export declare abstract class System {
    protected world: World;
    constructor(world: World);
    /**
     * Update method called each frame
     */
    abstract update(deltaTime: number): void;
    /**
     * Optional initialization
     */
    init?(): void;
    /**
     * Optional cleanup
     */
    destroy?(): void;
}
//# sourceMappingURL=System.d.ts.map