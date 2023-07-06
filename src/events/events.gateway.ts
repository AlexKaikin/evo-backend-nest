import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { CreateEventDto } from './dto/create-event.dto'
import { Server } from 'http'
import { EventsService } from './events.service'

@WebSocketGateway()
export class EventsGateway {
  constructor(private readonly eventsService: EventsService) {}

  @WebSocketServer()
  server: Server

  @SubscribeMessage('message')
  create(@MessageBody() message: CreateEventDto) {
    return this.eventsService.create(message, this.server)
  }
}
