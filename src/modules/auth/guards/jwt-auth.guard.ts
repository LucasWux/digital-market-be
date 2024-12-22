// src/auth/jwt-auth.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/decorators/public.decorator';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest<Request>();
    const client = context.switchToWs().getClient();
    if (client?.handshake) {
      if (isPublic) {
        return true;
      }
      throw new WsException('Unauthorized');
    }
    const token = request.cookies['jwt'];
    if (!token) {
      if (isPublic) {
        return true;
      }
      throw new UnauthorizedException('No token found');
    }
    try {
      const decoded = this.jwtService.verify(token);
      request.user = decoded;
      return true;
    } catch (err) {
      if (isPublic) {
        return true;
      }
      throw new UnauthorizedException('Invalid token');
    }
  }
}
