import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { KeycloakStrategy } from './keycloak.strategy';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [PassportModule, UsersModule],
  providers: [KeycloakStrategy],
  controllers: [AuthController],
})
export class AuthModule {}