import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common'
import { Response } from 'express'
import { CreateNoteDto } from './dto/create-note.dto'
import { NotesService } from './notes.service'
import { Note } from './notes.schema'
import { Auth } from 'src/account/auth/decorators/auth.decorator'

@Controller('api/notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @Auth()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto)
  }

  @Get(':id')
  @Auth()
  async findAll(
    @Param('id') id: string,
    @Query() query: any,
    @Res() res: Response
  ): Promise<Response> {
    const { notes, totalCount }: any = await this.notesService.findAll(
      id,
      query
    )

    res.append('Access-Control-Expose-Headers', 'X-Total-Count')

    return res.set({ 'X-Total-Count': totalCount }).json(notes)
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') _id: string): Promise<Note> {
    return this.notesService.remove(_id)
  }
}
