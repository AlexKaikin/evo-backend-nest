import { Module } from '@nestjs/common'
import { GroupsModule } from './groups/groups.module'
import { MessagesModule } from './messages/messages.module'
import { NotesModule } from './notes/notes.module'
import { RoomsModule } from './rooms/rooms.module'

@Module({
  imports: [MessagesModule, NotesModule, RoomsModule, GroupsModule],
})
export class ClubModule {}
