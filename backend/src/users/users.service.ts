import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'

import { CreateUserDto } from './dto/create-user.dto'
import { User } from './users.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = this.userRepository.create(dto)

    return await this.userRepository.save(user)
  }

  async getAllUsers(options: { page: number; limit: number; search?: string }) {
    const { page, limit, search } = options

    const [items, total] = await this.userRepository.findAndCount({
      where: search ? { email: Like(`%${search}%`) } : {},
      order: { createdAt: 'DESC' },
      take: limit,
      skip: (page - 1) * limit,
    })

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } })
  }

  async findOneById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { id },
    })
  }
}
