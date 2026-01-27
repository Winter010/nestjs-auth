import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { AuthController } from '@/auth/auth.controller'
import { AuthService } from '@/auth/auth.service'
import { JwtStrategy } from '@/auth/jwt.strategy'
import { UsersModule } from '@/users/users.module'

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET') || 'SECRET',
        signOptions: { expiresIn: '24h' },
      }),
    }),
  ],
})
export class AuthModule {}
