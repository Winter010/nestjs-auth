import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SeedService } from './seed.service'
import { UsersController } from './users.controller'
import { User } from './users.entity'
import { UsersService } from './users.service'

@Module({
  controllers: [UsersController],
  providers: [UsersService, SeedService],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersService],
})
export class UsersModule {}
