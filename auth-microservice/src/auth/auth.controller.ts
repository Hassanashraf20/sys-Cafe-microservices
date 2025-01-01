import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'auth_signup' })
  async handleRegisterUser(data: any) {
    return this.authService.registerUser(data);
  }

  @MessagePattern('user_created')
  async handleUserCreated(data: any) {
    return this.authService.handleUserCreatedEvent(data);
  }
}

// import { Controller, Inject } from '@nestjs/common';
// import {
//   Ctx,
//   MessagePattern,
//   Payload,
//   RmqContext,
// } from '@nestjs/microservices';
// import { AuthService } from './auth.service';
// import { loginDto } from './dtos/login.dto';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @MessagePattern('auth_signup')
//   async signup(@Payload() data: any): Promise<any> {
//     console.log('payload log from auth microservice', data);
//     const r = await this.authService.log(data);
//     return { status: 'success', message: 'Signup successful', Res: r };
//   }

//   // @MessagePattern('auth_login')
//   // async login(loginDto: loginDto) {
//   //   return this.authService.login(loginDto);
//   // }

//   // @MessagePattern('auth_profile')
//   // async getProfile(data: { user: any }) {
//   //   return {
//   //     message: 'Profile fetched successfully',
//   //     user: data.user,
//   //   };
//   // }
// }
