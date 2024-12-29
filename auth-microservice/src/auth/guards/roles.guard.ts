// // src/auth/roles.guard.ts
// import {
//   Injectable,
//   CanActivate,
//   ExecutionContext,
//   ForbiddenException,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector ,
//     private jwtService: JwtService
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     // Retrieve required roles from the decorator
//     const requiredRoles = this.reflector.getAllAndOverride<string[]>(
//       ROLES_KEY,
//       [context.getHandler(), context.getClass()],
//     );

//     const request = context.switchToHttp().getRequest();

//     const token = request.cookies['jwt'];

//     const payload = await this.jwtService.verifyAsync(token, {
//       secret: process.env.JWT_SECRET_KEY,
//     });
//     request['user'] = payload;

//     if (!requiredRoles || request.user.role === 'admin') {
//       return true;
//     }

//     if (!payload || !payload.role) {
//       throw new ForbiddenException('User role not found in token.');
//     }

//     // Check if user's role matches any of the required roles
//     if (!requiredRoles.includes(payload.role)) {
//       throw new ForbiddenException(
//         'You do not have the necessary permissions to access this resource.',
//       );
//     }

//     return true;
//   }
// }
