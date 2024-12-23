import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatResponseDto } from './dto/response-chat.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateChatDto } from './dto/create-chat.dto';
import { QueryChatDto } from './dto/query-chat.dto';
import { UserId } from 'src/decorators/user-payload.decorator';
import { UserResponseDto } from '../user/dto/response-user.dto';

@Controller('chat')
@ApiTags('Chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @ApiOperation({ summary: 'Create Chat' })
  @ApiOkResponse({ type: ChatResponseDto })
  async create(@UserId() senderId: number, @Body() dto: CreateChatDto) {
    return this.chatService.create(senderId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get Chat Box' })
  @ApiOkResponse({ type: [ChatResponseDto] })
  async get(@UserId() ownerId: number, @Query() dto: QueryChatDto) {
    return await this.chatService.getChatBox(ownerId, dto);
  }

  @Get('/list-user')
  @ApiOperation({ summary: 'Get list users in chat' })
  @ApiOkResponse({ type: [UserResponseDto] })
  async getListUsers(@UserId() ownerId: number) {
    return await this.chatService.getListPartner(ownerId);
  }
}
