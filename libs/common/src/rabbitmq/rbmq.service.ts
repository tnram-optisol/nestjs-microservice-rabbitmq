import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { RmqOptions } from '@nestjs/microservices/interfaces';

@Injectable()
export default class RbmqService {
  constructor(private readonly configService: ConfigService) {}
  getOptions(queue: string, noAck = true): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get<string>('RABBITMQ_URI')],
        queue: this.configService.get(`RABBIT_MQ_${queue}_QUEUE`),
        noAck,
        persistent: true,
      },
    };
  }
}
