import { Module } from '@nestjs/common'
import { EventsModule } from './events/events.module'
import { GroupsModule } from './groups/groups.module'
import { MessagesModule } from './messages/messages.module'
import { NotesModule } from './notes/notes.module'
import { RecommendationsModule } from './recommendations/recommendations.module'
import { RoomsModule } from './rooms/rooms.module'

@Module({
  imports: [
    MessagesModule,
    NotesModule,
    RoomsModule,
    GroupsModule,
    RecommendationsModule,
    EventsModule,
  ],
})
export class ClubModule {}
