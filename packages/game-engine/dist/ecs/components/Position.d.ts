import { Component } from '../Component';
import type { Location } from '../../types';
/**
 * Position component - stores grid position
 */
export declare class Position extends Component {
    x: number;
    y: number;
    constructor(entityId: number, x: number, y: number);
    setLocation(location: Location): void;
    getLocation(): Location;
}
//# sourceMappingURL=Position.d.ts.map