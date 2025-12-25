import { System } from '../System';
/**
 * RenderSystem - Calculates render coordinates for all entities
 */
export declare class RenderSystem extends System {
    private mapSize;
    constructor(world: any, mapSize: number);
    update(_deltaTime: number): void;
    private calculateMovementOffset;
    setMapSize(size: number): void;
}
//# sourceMappingURL=RenderSystem.d.ts.map