import { Controller, Get, Request, UseGuards } from '@nestjs/common'

import { Roles } from '@/auth/decorators/roles.decorator'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { RolesGuard } from '@/auth/guards/roles.guard'

import { type RequestWithUser } from './types/request-with-user'
import { UserRole } from './users.entity'
import { UsersService } from './users.service'

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req: RequestWithUser) {
    return this.usersService.findOneById(req.user.id)
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/all')
  getAll() {
    return this.usersService.getAllUsers()
  }
}
