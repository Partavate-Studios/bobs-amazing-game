import { EntityType } from '@/libs/enums'

export interface Location {
  x: number,
  y: number
}

export interface RenderEntity {
  location: Location,
  coordinates: Location,
  type: EntityType,
  entityId?: number
}
