import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { AUTH_SERVICE } from '../constants/services';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@Inject(AUTH_SERVICE) private authClient: ClientProxy) {}

  async registerUser(userData: CreateUserDto) {
    return this.authClient.send('book-created', userData);
  }
  async getUser(email: string) {
    return this.authClient.send({ cmd: 'greeting' }, email);
  }
  async getRoles() {
    return this.authClient.send({ cmd: 'getRole' }, 'role');
  }
}
