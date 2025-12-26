import { Crud } from '../rest'
import type { Hud } from '../models'

export class Huds extends Crud<Hud> {
  constructor(endpoint: string) {
    super(endpoint, 'huds')
  }
}
