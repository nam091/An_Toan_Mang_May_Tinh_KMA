import { Controller, Get, Req, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('api/auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService, // Inject ConfigService
  ) {}

  @Get('login')
  @UseGuards(AuthGuard('keycloak'))
  login() {
    // redirect to Keycloak
  }

  @Get('callback')
  @UseGuards(AuthGuard('keycloak'))
  async callback(@Req() req, @Res() res: Response) { // Bỏ @Res({ passthrough: true })
    const user = await this.usersService.upsertFromKeycloak(req.user);

    const payload = {
      sub: user.sub,
      email: user.email,
      roles: req.user.roles || [],
    };

    const accessToken = this.jwtService.sign(payload);

    // Chuyển hướng về frontend với token trong query params
    // Cổng 5173 là cổng mặc định của Vite
    res.redirect(`http://localhost:5173/auth/callback?token=${accessToken}`);
  }

  @Get('logout')
  logout(@Req() req, @Res() res: Response) {
    // Xóa session/cookie phía NestJS nếu có
    // req.logout(); // Nếu bạn dùng session

    // Chuyển hướng đến endpoint logout của Keycloak
    const issuerUrl = this.configService.get<string>('KEYCLOAK_ISSUER_URL');
    const postLogoutRedirectUri = 'http://localhost:5173'; // Trang sẽ quay về sau khi logout
    const keycloakLogoutUrl = `<span class="math-inline">\{issuerUrl\}/protocol/openid\-connect/logout?post\_logout\_redirect\_uri\=</span>{encodeURIComponent(postLogoutRedirectUri)}`;

    res.redirect(keycloakLogoutUrl);
  }
}