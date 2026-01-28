import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'

import { CreateUserDto } from '@/users/dto/create-user.dto'
import { User } from '@/users/users.entity'
import { UsersService } from '@/users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto)

    return this.generateToken(user)
  }

  async registration(dto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(dto.email)

    if (candidate) {
      throw new ConflictException('Пользователь с таким email уже существует')
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10)

    const user = await this.userService.createUser({
      ...dto,
      password: hashedPassword,
    })

    return this.generateToken(user)
  }

  private generateToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    }

    return {
      token: this.jwtService.sign(payload),

      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    }
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email)

    const isPasswordEquals = await bcrypt.compare(
      userDto.password,
      user?.password ?? '',
    )

    if (user && isPasswordEquals) return user

    throw new UnauthorizedException('Неверные учетные данные')
  }
}
