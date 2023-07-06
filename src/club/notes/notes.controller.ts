import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  //Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common'
import { Response } from 'express'
import { CreateNoteDto } from './dto/create-note.dto'
//import { UpdateNoteDto } from './dto/update-note.dto'
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

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.notesService.findOne(+id)
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
  //   return this.notesService.update(+id, updateNoteDto)
  // }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string): Promise<Note> {
    return this.notesService.remove(+id)
  }
}
