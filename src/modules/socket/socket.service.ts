import { Injectable } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Chat } from '../chat/entities/chat.entity';
import { getRoom } from 'src/utils/helpers';
@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*', // TODO: change to production domain
  },
})
export class SocketService {
  @WebSocketServer() server: Server;
  constructor() {}

  emitChatToRoom(chat: Chat) {
    const room = getRoom(chat.senderId, chat.receiverId);
    this.server.to(room).emit(`SubscribeChat`, chat);
  }
}
