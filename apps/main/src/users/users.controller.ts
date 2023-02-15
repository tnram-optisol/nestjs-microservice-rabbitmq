import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateUserDto } from 'apps/auth/src/dto/create-user.dto';
import { UserService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private userService: UserService) {}
  @Get('profile')
  async user(@Query('email') email: string) {
    try {
      return this.userService.getUser(email);
    } catch (error) {
      throw error;
    }
  }
  @Get('roles')
  async roles() {
    try {
      return this.userService.getRoles();
    } catch (error) {
      throw error;
    }
  }
  @Post('register')
  async register(@Body() userData: CreateUserDto) {
    try {
      return this.userService.registerUser(userData);
    } catch (error) {
      throw error;
    }
  }
}
