import type { CreatedAt, DeletedAt, Entity, UpdatedAt } from '../extendables'

export interface User extends Entity, CreatedAt, UpdatedAt, DeletedAt {
  name: string
  email: string
  type: string
  steamID64: string
  twitch_channel: string
}
