// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/public.decorator';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @Public()
  async register(@Body() body: LoginDto) {
    return this.authService.registerUser(body.userName, body.password);
  }

  @Post('login')
  @Public()
  async login(@Body() body: LoginDto, @Res() res: Response) {
    const user = await this.authService.validateUser(
      body.userName,
      body.password,
    );

    if (user) {
      const token = await this.authService.login(user);

      res.cookie('jwt', token.access_token, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000,
      });
      res.status(HttpStatus.OK).send({ message: 'Login successful' });
      return;
    }
    throw new UnauthorizedException();
  }

  @Post('logout')
  @Public()
  logout(@Res() res: Response) {
    res.clearCookie('jwt');
    res.status(HttpStatus.OK).send({ message: 'Logout successful' });
    return;
  }
}
