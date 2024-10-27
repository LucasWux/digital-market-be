import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(userName: string, password: string) {
    const user = await this.userService.findByUserName(userName);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async registerUser(userName: string, password: string) {
    await this.userService.register(userName, password);
  }

  async login(user: User) {
    const payload = { userId: user.id };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '1h' }),
    };
  }
}
