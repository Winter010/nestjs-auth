import {
  Controller,
  Get,
  Query,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'

import { Roles } from '@/auth/decorators/roles.decorator'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { RolesGuard } from '@/auth/guards/roles.guard'

import { type RequestWithUser } from './types/request-with-user'
import { UserRole } from './users.entity'
import { UsersService } from './users.service'

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/current')
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@Request() req: RequestWithUser) {
    const user = await this.usersService.findOneById(req.user.id)

    if (!user) {
      throw new UnauthorizedException('Пользователь не найден')
    }

    return user
  }

  @Get('/all')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
  ) {
    return this.usersService.getAllUsers({
      page: Number(page),
      limit: Number(limit),
      search,
    })
  }
}
