import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

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

  async getAllUsers() {
    const users = await this.userRepository.find()

    return users
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
