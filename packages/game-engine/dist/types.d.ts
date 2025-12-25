/**
 * Common types used by the game engine
 */
export interface Location {
    x: number;
    y: number;
}
export interface RenderEntity {
    location: Location;
    coordinates: Location;
    type: number;
    entityId?: number;
}
//# sourceMappingURL=types.d.ts.map