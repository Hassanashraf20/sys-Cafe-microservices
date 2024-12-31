import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly rabbitmqService: RabbitmqService) {}

  @Post('signup')
  async signup(@Body() signupDto: any) {
    console.log('From Gateway: ', signupDto);
    return await this.rabbitmqService.send('auth_signup', signupDto);
  }

  @Post('login')
  async login(@Body() loginDto: any) {
    try {
      return await this.rabbitmqService.send('auth_login', loginDto);
    } catch (error) {
      throw error.massage;
    }
  }

  @Get('profile')
  async getProfile(@Req() req: any) {
    try {
      return await this.rabbitmqService.send('auth_profile', {
        user: req.user,
      });
    } catch (error) {
      throw error.massage;
    }
  }
}
