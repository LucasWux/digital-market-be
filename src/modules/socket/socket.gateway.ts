/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*', // TODO: change to production domain
  },
})
export class SocketGateway {
  private readonly logger: Logger = new Logger(SocketGateway.name);

  @WebSocketServer() server: Server;

  @SubscribeMessage('SubscribeChat')
  handleSubscribeChat(client: Socket, room: string): void {
    client.join(room);
  }

  @SubscribeMessage('UnSubscribeChat')
  handleUnSubscribeChat(client: Socket, room: string): void {
    client.leave(room);
  }
}
