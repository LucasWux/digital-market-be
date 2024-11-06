import { Injectable } from '@nestjs/common';
import { QueryChatDto } from './dto/query-chat.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private readonly repo: Repository<Chat>,
  ) {}

  async create(senderId: number, createChatDto: CreateChatDto) {
    return await this.repo.save({ senderId, ...createChatDto });
  }

  async getChatBox(ownerId: number, queryChatDto: QueryChatDto) {
    const listUser = [ownerId, queryChatDto.userId];
    return await this.repo.find({
      where: {
        senderId: In(listUser),
        receiverId: In(listUser),
      },
    });
  }
}
