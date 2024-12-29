import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';

@Module({
  imports: [RabbitmqModule],
  controllers: [AuthController],
})
export class AuthModule {}
