import { Injectable } from '@nestjs/common'
import { Server } from 'http'
import { CreateSocketDto } from './dto/create-socket.dto'

@Injectable()
export class SocketsService {
  create(message: CreateSocketDto, server: Server) {
    return server.emit(message.roomID, message)
  }
}
