import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'

import { CreateUserDto } from './dto/create-user.dto'
import { UserRole } from './users.entity'
import { UsersService } from './users.service'

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name)

  constructor(private usersService: UsersService) {}

  async onApplicationBootstrap() {
    const adminEmail = 'admin@email.com'

    const admin = await this.usersService.getUserByEmail(adminEmail)

    if (!admin) {
      this.logger.log('Creating default admin user...')

      const hashedPassword = await bcrypt.hash('admin123', 10)

      await this.usersService.createUser({
        email: adminEmail,
        password: hashedPassword,
        role: UserRole.ADMIN,
      } as CreateUserDto)

      this.logger.log('✅ Default admin created: admin@admin.com / admin123')
    } else {
      this.logger.log('Admin user already exists.')
    }
  }
}
