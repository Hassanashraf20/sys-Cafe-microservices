import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('user')
export class UserGatewayController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
  ) {}

  @Post('profile')
  async updateUserProfile(@Body() profileData: any) {
    return this.userService
      .send({ cmd: 'update_profile' }, profileData)
      .toPromise();
  }
}
