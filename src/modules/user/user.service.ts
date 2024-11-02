import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

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

  async update(id: number, dto: UpdateUserDto) {
    await this.repo.update({ id }, dto);
    return await this.findById(id);
  }

  async findByUserName(userName: string): Promise<User | undefined> {
    return await this.repo.findOne({ where: { userName } });
  }

  async findById(id: number) {
    return await this.repo.findOneBy({ id });
  }

  async getAll() {
    return await this.repo.find();
  }
}
