import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateNoteDto } from './dto/create-note.dto'
//import { UpdateNoteDto } from './dto/update-note.dto'
import { Note, NoteDocument } from './notes.schema'

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  create(note: CreateNoteDto) {
    note.id = +new Date().getTime()
    note.created = +new Date().getTime()

    const newNote = new this.noteModel(note)
    newNote.save()

    return newNote
  }

  async findAll(id: string, query: any) {
    const _id = id
    const by = query.by
    const _limit = query._limit ? parseInt(query._limit) : 0
    const _page = query._page ? parseInt(query._page) : 1

    function getPopulateParams() {
      return by === 'user' ? 'fullName avatarUrl' : 'title avatarUrl'
    }

    function getFindParams() {
      return by === 'user' ? { user: _id } : { group: _id }
    }

    const totalCount: number = (await this.noteModel.find(getFindParams()))
      .length
    const notes = await this.noteModel
      .find(getFindParams())
      .sort({ id: -1 })
      .limit(_limit)
      .skip(_limit * (_page - 1))
      .populate(by, getPopulateParams())
      .exec()

    return { notes, totalCount }
  }

  remove(_id: string) {
    return this.noteModel.findOneAndDelete({ _id })
  }
}
