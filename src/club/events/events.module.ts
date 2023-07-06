import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from 'src/account/users/users.schema'
import { Group, GroupSchema } from '../groups/groups.schema'
import { Note, NoteSchema } from '../notes/notes.schema'
import { EventsController } from './events.controller'
import { EventsService } from './events.service'

@Module({
  controllers: [EventsController],
  providers: [EventsService],
  imports: [
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
  ],
})
export class EventsModule {}
