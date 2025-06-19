import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.secret') || 'default-secret-key',
    });
  }

  async validate(payload: any) {
    // Tìm user trong DB hoặc trả về payload
    const user = await this.usersService.findBySub(payload.sub);
    
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    
    return {
      id: user.id,
      sub: payload.sub,
      email: payload.email,
      roles: payload.roles,
    };
  }
}