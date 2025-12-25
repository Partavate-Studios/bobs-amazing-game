import type { Location } from '../types'

/**
 * Convert grid coordinates to isometric render coordinates
 * @param x Grid X coordinate
 * @param y Grid Y coordinate
 * @param mapSize Total map size
 * @returns Render coordinates
 */
export function mapToRenderLocation(x: number, y: number, mapSize: number): Location {
  return {
    x: (x - y) * 64,
    y: (x + y) * 32 - 32 * (mapSize - 1)
  }
}

