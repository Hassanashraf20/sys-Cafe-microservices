// src/auth/auth.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly client: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const token = request.cookies['jwt'];

    if (!token) {
      throw new UnauthorizedException('Authentication token is missing.');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY,
      });

      request['user'] = payload;
      const user = await lastValueFrom(
        this.client.send('users.verifyToken', { userId: payload.id }),
      );

      if (!user) {
        throw new UnauthorizedException('Invalid user.');
      }

      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token.');
    }
  }
}
