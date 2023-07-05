import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Room, RoomSchema } from '../rooms/rooms.schema'
import { MessagesController } from './messages.controller'
import { Message, MessageSchema } from './messages.schema'
import { MessagesService } from './messages.service'

@Module({
  controllers: [MessagesController],
  providers: [MessagesService],
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
  ],
})
export class MessagesModule {}
