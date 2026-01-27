import { User } from '@/users/users.entity'

export interface RequestWithUser extends Request {
  user: Pick<User, 'id' | 'email' | 'role'>
}
