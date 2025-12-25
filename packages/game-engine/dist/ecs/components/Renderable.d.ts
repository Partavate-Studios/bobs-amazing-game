import { Component } from '../Component';
import type { Location } from '../../types';
/**
 * Renderable component - defines what should be rendered
 * entityType is a generic number/identifier that the game implementation defines
 */
export declare class Renderable extends Component {
    entityType: number;
    renderCoordinates: Location;
    zIndex: number;
    constructor(entityId: number, entityType: number);
}
//# sourceMappingURL=Renderable.d.ts.map