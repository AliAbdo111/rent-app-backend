import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from './constants';
import { AuthService } from './auth.service';

export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const { authorization }: any = request.headers;
      if (!authorization || authorization.trim() === '') {
        throw new UnauthorizedException('Please provide token');
      }
      const authToken = authorization.replace(/bearer/gim, '').trim();
      console.log(authToken)
      const resp = await this.authService.validateToken(authToken);
      console.log(resp)
      request.decodedData = resp;
      return true;
    } catch (error) {
      console.log('auth error :', error.message);
      throw new ForbiddenException(
        error.message || 'session expired! Please sign In',
      );
    }
  }
  
  // async canActivate(context: ExecutionContext): Promise<boolean> {
  //   const request = context.switchToHttp().getRequest();
  //   const token = this.extractTokenFromHeader(request);

  //   if (!token) {
  //     throw new UnauthorizedException();
  //   }

  //   try {
  //     console.log(token);
  //     const payload = await this.jwtService.verify(token, {
  //       secret: jwtConstants.secret,
  //     });
  //     console.log(`payload is ${payload}`);
  //     // 💡 We're assigning the payload to the request object here
  //     // so that we can access it in our route handlers
  //     request['user'] = payload;
  //   } catch (error) {
  //     console.log(error);
  //     throw new UnauthorizedException();
  //   }
  //   return true;
  // }

  // private extractTokenFromHeader(request: Request): string {
  //   const [type, token] = request.headers.authorization?.split(' ') ?? [];
  //   return type === 'Bearer' ? token : undefined;
  // }
}
