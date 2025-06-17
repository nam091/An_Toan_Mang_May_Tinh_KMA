import { Controller, Get, Req, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';

@Controller('api/auth')
export class AuthController {
  constructor(private usersService: UsersService) {}

  @Get('login')
  @UseGuards(AuthGuard('keycloak'))
  login() {
    // redirect to Keycloak
  }

  @Get('callback')
  @UseGuards(AuthGuard('keycloak'))
  async callback(@Req() req, @Res() res) {
    // req.user chứa thông tin từ strategy.validate
    const user = await this.usersService.upsertFromKeycloak(req.user);
    // issue JWT hoặc set session nếu muốn
    return res.json(user);
  }
}