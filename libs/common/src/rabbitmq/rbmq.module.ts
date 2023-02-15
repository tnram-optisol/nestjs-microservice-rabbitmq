/* eslint-disable prettier/prettier */
import { Module, DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices/enums';
import { ClientsModule } from '@nestjs/microservices/module';
import RbmqService from './rbmq.service';

interface RbmqModuleOptions {
  name: string;
}

@Module({
  providers: [RbmqService],
  exports: [RbmqService],
})
export default class RbmqModule {
  static register({ name }: RbmqModuleOptions): DynamicModule {
    return {
      module: RbmqModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name,
            useFactory: (configService: ConfigService) => ({
              transport: Transport.RMQ,
              options: {
                urls: [configService.get<string>('RABBIT_MQ_URI')],
                queue: configService.get<string>(`RABBIT_MQ_${name}_QUEUE`),
              },
            }),
            inject: [ConfigService],
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
