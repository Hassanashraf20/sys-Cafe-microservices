import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  async registerUser(@Payload() data: any) {
    // Business logic for registering a user
    // console.log('Auth Microservice - Registering user:', data);
    // Communicate with User Microservice
    try {
      const userResponse = await lastValueFrom(
        this.client.send({ cmd: 'create_user' }, data),
      );
      console.log('Auth Microservice - User Response:', userResponse, data);
      return { Status: 'success', userResponse };
    } catch (error) {
      if (error?.message && error?.message === 'User Already Exists') {
        throw new HttpException(
          { status: 'error', message: 'User Already Exists' },
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        'User Microservice - Error:',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async handleUserCreatedEvent(data: any) {
    // console.log('Auth Microservice - User Created Event Received:', data);
    // Perform any additional operations after the user is created
    return { message: 'processed successfully', data };
  }
}

// import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { loginDto } from './dtos/login.dto';
// import * as bcrypt from 'bcrypt';
// import { SingupDto } from './dtos/signup.dto';
// import { ClientProxy } from '@nestjs/microservices';
// import { lastValueFrom } from 'rxjs';

// @Injectable()
// export class AuthService {
//   constructor() {} // @Inject('USER_SERVICE') private readonly client: ClientProxy, // private readonly jwtService: JwtService,

//   async log(body: any): Promise<any> {
//     console.log('body from auth micro', body.email);
//   }

//   // async signup(signupDto: SingupDto): Promise<any> {
//   //   const hashedPassword = await bcrypt.hash(signupDto.password, 10);
//   //   const user = await lastValueFrom(
//   //     this.client.send('user.signup', {
//   //       ...signupDto,
//   //       password: hashedPassword,
//   //     }),
//   //   );
//   //   console.log('user from auth micro', user);

//   //   const payload = { id: user.id, username: user.name, role: user.role };
//   //   const token = await this.jwtService.signAsync(payload);
//   //   return { user, token };
//   // }

//   // async login(loginDto: loginDto): Promise<any> {
//   //   // const user = await this.usersService.findOneByEmail(loginDto.email);
//   //   const user = await lastValueFrom(this.client.send('user.login', loginDto));
//   //   const isPasswordValid = await bcrypt.compare(
//   //     loginDto.password,
//   //     user.password,
//   //   );

//   //   if (!user || !isPasswordValid) {
//   //     throw new UnauthorizedException('Invalid email or password');
//   //   }
//   //   const payload = { id: user.id, username: user.name, role: user.role };
//   //   const token = await this.jwtService.signAsync(payload);
//   //   return { token, user };
//   // }
// }
