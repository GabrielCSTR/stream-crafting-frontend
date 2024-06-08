import { Crud } from '../rest'
import { type User } from '../models/user'

export class Users extends Crud<User> {
  constructor(endpoint: string) {
    super(endpoint, 'users')
  }
}
