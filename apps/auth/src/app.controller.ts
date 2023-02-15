import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CommonService } from 'y/common';
import { UsersService } from './users.service';

@Controller()
export class AppController {
  constructor(
    private userService: UsersService,
    private commonService: CommonService,
  ) {}

  @MessagePattern({ cmd: 'greeting' })
  getGreetingMessage(name: string) {
    return this.userService.getUser(name);
  }

  @MessagePattern({ cmd: 'getRole' })
  getRole() {
    return this.userService.getRole();
  }

  @EventPattern('book-created')
  async handleBookCreatedEvent(data: any) {
    console.log(data);
    await this.userService.register(data);
    return this.commonService.response('200', 'REGISTERED SUCCESSFULLY');
  }
}
