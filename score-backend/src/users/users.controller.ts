import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':sub')
  getOne(@Param('sub') sub: string) {
    return this.usersService.findOne(sub);
  }
}