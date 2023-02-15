import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as Joi from 'joi';

import { AUTH_SERVICE } from '../constants/services';
import { UsersController } from './users.controller';
import { UserService } from './users.service';

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
  controllers: [UsersController],
  providers: [UserService],
})
export class UsersModule {}
