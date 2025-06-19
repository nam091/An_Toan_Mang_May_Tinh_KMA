import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UsersService } from '../users/users.service';

@Controller('api/auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  @Get('login')
  @UseGuards(AuthGuard('keycloak'))
  login() {
    // Redirect to Keycloak handled by passport
  }

  @Get('callback')
  @UseGuards(AuthGuard('keycloak'))
  async callback(@Req() req, @Res() res: Response) {
    // req.user chứa thông tin từ strategy.validate
    const user = await this.usersService.upsertFromKeycloak(req.user);

    // Tạo JWT để client sử dụng
    const payload = {
      sub: user.sub,
      email: user.email,
      roles: user.roles || ['student']
    };

    const token = this.jwtService.sign(payload);

    // Trả về token và thông tin người dùng
    return res.json({
      access_token: token,
      user: {
        id: user.id,
        sub: user.sub,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles || ['student']
      }
    });
  }

  @Get('logout')
  @UseGuards(AuthGuard('jwt'))
  logout(@Req() req, @Res() res: Response) {
    // Có thể thêm logic logout ở đây nếu cần
    return res.json({ success: true, message: 'Đăng xuất thành công' });
  }
}