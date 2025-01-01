import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class UsersController {
  constructor(
    // @Inject('AUTH_SERVICE')
    private readonly userService: UsersService,
  ) {}

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @MessagePattern({ cmd: 'create_user' })
  // @HttpCode(201)
  async create(createUserDto: CreateUserDto) {
    console.log('log from user micro', createUserDto);
    return await this.userService.create(createUserDto);
  }

  // @MessagePattern('user.login')
  // async findOne(@Payload() loginDto: { email: string; password: string }) {
  //   const { email } = loginDto;
  //   const user = await this.userService.findOneByEmail(email);
  //   return user;
  // }
}
