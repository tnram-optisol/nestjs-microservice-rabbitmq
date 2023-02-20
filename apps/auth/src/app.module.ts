import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './database/entities/user.entity';
import { HelperService } from './helper/helper.service';
import RbmqModule from 'y/common/rabbitmq/rbmq.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { LocalStrategy } from './local.auth';
import { AuthService } from './auth.service';
import { CommonService } from 'y/common';

import { Role } from './database/entities/role.entity';
import { config } from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    RbmqModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        MONGODB_NAME: Joi.string().required(),
        RABBITMQ_URI: Joi.string().required(),
      }),
      envFilePath: 'apps/auth/.env',
    }),
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([User, Role]),
  ],
  controllers: [AppController],
  providers: [
    AuthService,
    LocalStrategy,
    UsersService,
    HelperService,
    AppService,
    CommonService,
  ],
})
export class AppModule {}
