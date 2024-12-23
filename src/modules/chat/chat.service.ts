import { Injectable } from '@nestjs/common';
import { QueryChatDto } from './dto/query-chat.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';
import { User } from '../user/entities/user.entity';
import { UserResponseDto } from '../user/dto/response-user.dto';
import { getTimeNowBySeconds } from 'src/utils/timeHelpers';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private readonly repo: Repository<Chat>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(senderId: number, createChatDto: CreateChatDto) {
    return await this.repo.save({
      senderId,
      ...createChatDto,
      createTime: getTimeNowBySeconds(),
    });
  }

  async getChatBox(ownerId: number, queryChatDto: QueryChatDto) {
    const chatsSend = await this.repo.find({
      where: {
        senderId: ownerId,
        receiverId: queryChatDto.userId,
      },
    });

    const chatsReceive = await this.repo.find({
      where: {
        senderId: queryChatDto.userId,
        receiverId: ownerId,
      },
    });

    const validChatIds = [
      ...chatsSend.map((chat) => chat.id),
      ...chatsReceive.map((chat) => chat.id),
    ];

    return await this.repo.find({
      where: {
        id: In(validChatIds),
      },
      order: {
        createTime: 'DESC',
      },
    });
  }

  async getListPartner(ownerId: number) {
    const chats = await this.repo.find({
      where: [{ senderId: ownerId }, { receiverId: ownerId }],
    });

    const listUserIds: number[] = [];
    for (const chat of chats) {
      if (chat.senderId === ownerId) listUserIds.push(chat.receiverId);
      else listUserIds.push(chat.senderId);
    }

    return (await this.userRepo.findBy({
      id: In(listUserIds),
    })) as UserResponseDto[];
  }
}
