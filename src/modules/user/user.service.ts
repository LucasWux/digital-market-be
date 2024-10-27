// src/users/users.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async findByUserName(userName: string): Promise<User | undefined> {
    return await this.repo.findOne({ where: { userName } });
  }

  async getAll() {
    return await this.repo.find();
  }

  async register(userName: string, password: string): Promise<User> {
    const existingUser = await this.findByUserName(userName);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.repo.save({
      userName,
      password: hashedPassword,
    });
    return newUser;
  }
}
