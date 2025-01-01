import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom, lastValueFrom } from 'rxjs';

@Controller('auth')
export class AuthGatewayController {
  constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) {}

  @Post('signup')
  async registerUser(@Body() userData: any) {
    return lastValueFrom(this.client.send({ cmd: 'auth_signup' }, userData));
  }

  @Post('login')
  async login(@Body() loginDto: any) {
    try {
      // return await this.rabbitmqService.send('auth_login', loginDto);
    } catch (error) {
      throw error.massage;
    }
  }

  // @Get('profile')
  // async getProfile(@Req() req: any) {
  //   try {
  //     return await this.rabbitmqService.send('auth_profile', {
  //       user: req.user,
  //     });
  //   } catch (error) {
  //     throw error.massage;
  //   }
  // }
}
