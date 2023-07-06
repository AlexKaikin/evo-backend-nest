import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { NotesController } from './notes.controller'
import { Note, NoteSchema } from './notes.schema'
import { NotesService } from './notes.service'

@Module({
  controllers: [NotesController],
  providers: [NotesService],
  imports: [
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
  ],
})
export class NotesModule {}
