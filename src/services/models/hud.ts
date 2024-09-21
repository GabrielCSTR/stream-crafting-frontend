import type { CreatedAt, Entity, UpdatedAt } from '../extendables'

export interface Hud extends Entity, CreatedAt, UpdatedAt {
  src: string
  name: string
}
