import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { RequestWithUser } from '@/users/types/request-with-user'
import { UserRole } from '@/users/users.entity'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    )

    if (!requiredRoles) return true

    const { user } = context.switchToHttp().getRequest<RequestWithUser>()

    const hasRole = requiredRoles.includes(user?.role)

    if (!hasRole) {
      throw new ForbiddenException('Доступ запрещен: недостаточно прав')
    }

    return true
  }
}
