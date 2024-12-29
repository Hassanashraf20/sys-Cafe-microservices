import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RabbitmqService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://hassan:pass123@rabbitmq:5672'],
        queue: 'gateway_queue',
        queueOptions: { durable: true },
      },
    });
  }

  async send(pattern: string, data: any) {
    return await lastValueFrom(this.client.send(pattern, data));
  }
}
