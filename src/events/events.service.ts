import { Injectable } from '@nestjs/common'
import { Server } from 'http'
import { CreateEventDto } from './dto/create-event.dto'

@Injectable()
export class EventsService {
  create(message: CreateEventDto, server: Server) {
    return server.emit(message.roomID, message)
  }
}
