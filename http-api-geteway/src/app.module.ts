import { Module } from '@nestjs/common';
import { AuthGatewayModule } from './auth/auth.module';
import { UserGatewayModule } from './user/user.module';

@Module({
  imports: [AuthGatewayModule, UserGatewayModule],
})
export class GatewayModule {}
