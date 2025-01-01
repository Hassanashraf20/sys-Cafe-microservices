import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @Inject('AUTH_SERVICE') private readonly client: ClientProxy,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find();
    if (!users) {
      throw new NotFoundException('Users Not Found');
    }
    return users;
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const { email } = createUserDto;
      const existingUser = await this.usersRepository.findOne({
        where: { email },
      });
      if (existingUser) {
        throw new RpcException({
          status: 'error',
          code: HttpStatus.CONFLICT,
          message: 'User Already Exists',
        });
      }
      const newUser = this.usersRepository.create(createUserDto);
      await this.usersRepository.save(newUser);
      this.client.send('user_created', newUser);
      return { status: 'success', data: newUser };
    } catch (error) {
      console.error('User Microservice - Error:', error.message);
      throw new HttpException(
        'User Microservice - Error:',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return user;
  }
  async findOneByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException(`UserId ${email} Not Found!`);
    }
    // this.client.send('user.login', user);
    return user;
  }
}
