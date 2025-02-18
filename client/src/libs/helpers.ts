export function mapToRenderLocation(x: number, y:number, mapSize:number):Location {
    return {
        x: (x - y) * 64,
        y: (x + y) * 32 - 32 * (mapSize -1) 
    }
}