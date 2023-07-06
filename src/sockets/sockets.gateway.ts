import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server } from 'http'
import { CreateSocketDto } from './dto/create-socket.dto'
import { SocketsService } from './sockets.service'

@WebSocketGateway()
export class SocketsGateway {
  constructor(private readonly socketsService: SocketsService) {}

  @WebSocketServer()
  server: Server

  @SubscribeMessage('message')
  create(@MessageBody() message: CreateSocketDto) {
    return this.socketsService.create(message, this.server)
  }
}
