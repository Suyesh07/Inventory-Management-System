import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/helpers/public';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector:Reflector,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>{
    
    try {
      const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (isPublic) {
        return true;
      }

      const request: Request = context.switchToHttp().getRequest();
      const [type, token] = request.headers?.authorization?.split(' ') ?? [];
  
      if (type !== 'Bearer' || !token) {
        throw new UnauthorizedException();
      }
  
      const payload = await this.jwtService.verifyAsync(
        token, { secret: process.env.JWT_SECRET_KEY}
      )
  
      request['payload'] = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
