import { Controller, Get, Req, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Controller('api/auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Get('login')
  @UseGuards(AuthGuard('keycloak'))
  login() {
    // redirect to Keycloak
  }

  @Get('callback')
  @UseGuards(AuthGuard('keycloak'))
  // Hàm callback để trả về token
  async callback(@Req() req, @Res({ passthrough: true }) res: Response) {
    // req.user chứa thông tin từ strategy.validate
    const user = await this.usersService.upsertFromKeycloak(req.user);

    const payload = {
      sub: user.sub,
      email: user.email,  
    };

    const accessToken = this.jwtService.sign(payload);

    // Thay vì trả về user, ta sẽ redirect về frontend kèm theo token
    // Hoặc có thể trả về JSON để client xử lý
    // Ở đây ta sẽ redirect về trang dashboard của sinh viên để minh họa

    return {
       access_token: accessToken,
       user: payload
    }

    // Tùy chọn 2: Redirect với token (nếu frontend có thể đọc từ URL)
    // res.redirect(`http://localhost:5173/auth/callback?token=${accessToken}`);
  }
}