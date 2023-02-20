import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateUserDto } from 'apps/auth/src/dto/create-user.dto';
import { UserService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private userService: UserService) {}
  @Get('profile')
  async user(@Query('email') email: string) {
    return this.userService.getUser(email);
  }
  @Get('roles')
  async roles() {
    return this.userService.getRoles();
  }
  @Post('register')
  async register(@Body() userData: CreateUserDto) {
    return this.userService.registerUser(userData);
  }
}
