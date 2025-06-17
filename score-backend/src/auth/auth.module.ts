// score-backend/src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { KeycloakStrategy } from './keycloak.strategy';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt'; // Thêm import này
import { ConfigModule, ConfigService } from '@nestjs/config'; // Thêm import này

@Module({
  imports: [
    PassportModule,
    UsersModule,
    // Cấu hình JwtModule
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION_TIME'),
        },
      }),
    }),
  ],
  providers: [KeycloakStrategy],
  controllers: [AuthController],
})
export class AuthModule {}