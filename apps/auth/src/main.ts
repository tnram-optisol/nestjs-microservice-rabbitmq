import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import RbmqService from 'y/common/rabbitmq/rbmq.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const rbmqService = app.get<RbmqService>(RbmqService);
  app.useGlobalPipes(new ValidationPipe());
  app.connectMicroservice(rbmqService.getOptions('AUTH'));
  await app.startAllMicroservices();
}
bootstrap();
