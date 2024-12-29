// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://hassan:pass123@rabbitmq:5672'],
        queue: 'auth_queue',
        queueOptions: { durable: true },
      },
    },
  );

  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
  console.log('Auth Microservice is listening for messages');
}
bootstrap();
