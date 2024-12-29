import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { loginDto } from './dtos/login.dto';
import * as bcrypt from 'bcrypt';
import { SingupDto } from './dtos/signup.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly client: ClientProxy,
  ) {}

  async signup(signupDto: SingupDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(signupDto.password, 10);
    const user = await lastValueFrom(
      this.client.send('user.signup', {
        ...signupDto,
        password: hashedPassword,
      }),
    );
    const payload = { id: user.id, username: user.name, role: user.role };
    const token = await this.jwtService.signAsync(payload);
    return { user, token };
  }

  async login(loginDto: loginDto): Promise<any> {
    // const user = await this.usersService.findOneByEmail(loginDto.email);
    const user = await lastValueFrom(this.client.send('user.login', loginDto));
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!user || !isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const payload = { id: user.id, username: user.name, role: user.role };
    const token = await this.jwtService.signAsync(payload);
    return { token, user };
  }
}
