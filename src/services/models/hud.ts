import type { CreatedAt, Entity, UpdatedAt } from '../extendables'
import type { IHUDElement } from '@/types/hud'

export interface Hud extends Entity, CreatedAt, UpdatedAt {
  name: string
  userId: string | null
  elements: IHUDElement[]
  src?: string
}
