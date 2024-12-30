import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @MessagePattern('user.signup')
  @HttpCode(201)
  async create(@Payload() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @MessagePattern('user.login')
  async findOne(@Payload() loginDto: { email: string; password: string }) {
    const { email } = loginDto;
    const user = await this.userService.findOneByEmail(email);
    return user;
  }
}
