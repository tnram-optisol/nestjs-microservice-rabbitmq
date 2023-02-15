import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as Joi from 'joi';

import { MainController } from './main.controller';
import { MainService } from './main.service';
import { UsersController } from './users/users.controller';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { AUTH_SERVICE } from './constants/services';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'users_auth',
          persistent: true,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        MONGODB_NAME: Joi.string().required(),
        RABBITMQ_URI: Joi.string().required(),
      }),
      envFilePath: 'apps/auth/.env',
    }),
    UsersModule,
  ],
  controllers: [MainController, UsersController],
  providers: [MainService, UserService],
})
export class MainModule {}
