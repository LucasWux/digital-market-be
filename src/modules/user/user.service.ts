import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async register(dto: CreateUserDto): Promise<User> {
    const existingUser = await this.findByUserName(dto.username);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }
    const { password, ...rest } = dto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.repo.save({
      ...rest,
      password: hashedPassword,
    });
    return newUser;
  }

  async update(id: number, dto: UpdateUserDto) {
    await this.repo.update({ id }, dto);
    return await this.findById(id);
  }

  async findByUserName(username: string): Promise<User | undefined> {
    return await this.repo.findOne({ where: { username } });
  }

  async findById(id: number) {
    return await this.repo.findOneBy({ id });
  }

  async getAll() {
    return await this.repo.find();
  }

  async deleteByUserId(userId: number) {
    await this.repo.delete(userId);
  }

  async deleteAll() {
    await this.repo.clear();
  }
}
