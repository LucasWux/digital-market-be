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
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthResponseDto } from './dto/response-auth.dto';
import { UserResponseDto } from '../user/dto/response-user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register User' })
  @ApiOkResponse({ type: UserResponseDto })
  @Public()
  async register(@Body() body: CreateUserDto) {
    return await this.authService.registerUser(body);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiOkResponse({ type: AuthResponseDto })
  @Public()
  async login(@Body() body: LoginDto, @Res() res: Response) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );

    if (user) {
      const token = await this.authService.login(user);

      res.cookie('jwt', token.access_token, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000,
      });
      res
        .status(HttpStatus.OK)
        .send({ message: 'Login successful', isSuccess: true });
      return;
    }
    throw new UnauthorizedException();
  }

  @Post('logout')
  @ApiOperation({ summary: 'Log out' })
  @Public()
  @ApiOkResponse({ type: AuthResponseDto })
  logout(@Res() res: Response) {
    res.clearCookie('jwt');
    res
      .status(HttpStatus.OK)
      .send({ message: 'Logout successful', isSuccess: true });
    return;
  }
}
