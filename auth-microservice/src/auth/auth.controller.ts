import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { loginDto } from './dtos/login.dto';
import { SingupDto } from './dtos/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth_signup')
  async signup(signupDto: SingupDto) {
    return this.authService.signup(signupDto);
  }

  @MessagePattern('auth_login')
  async login(loginDto: loginDto) {
    return this.authService.login(loginDto);
  }

  @MessagePattern('auth_profile')
  async getProfile(data: { user: any }) {
    return {
      message: 'Profile fetched successfully',
      user: data.user,
    };
  }
}
