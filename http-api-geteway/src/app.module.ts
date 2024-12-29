import { Module } from '@nestjs/common';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [RabbitmqModule, AuthModule],
})
export class AppModule {}
