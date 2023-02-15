import { Controller, Get } from '@nestjs/common';
import { MainService } from './main.service';

@Controller('api')
export class MainController {
  constructor(private readonly mainService: MainService) {}

  @Get()
  getHello(): string {
    return this.mainService.getHello();
  }
}
