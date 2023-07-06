import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from 'src/account/users/users.schema'
import { Group, GroupDocument } from '../groups/groups.schema'
import { Note, NoteDocument } from '../notes/notes.schema'

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Note.name) private noteModel: Model<NoteDocument>
  ) {}

  async findAll(
    query: any,
    user: User
  ): Promise<{ events: Note[]; totalCount: number }> {
    const user_id = user._id
    const _limit = query._limit ? parseInt(query._limit) : 20
    const _page = query._page ? parseInt(query._page) : 1

    const users = await this.userModel.find({ subscribers: { $in: [user_id] } })

    const groups = await this.groupModel.find({
      subscribers: { $in: [user_id] },
    })

    function getParams() {
      return [...users.map(user => user._id), ...groups.map(group => group._id)]
    }

    function getFindParams() {
      return {
        $or: [{ user: { $in: getParams() } }, { group: { $in: getParams() } }],
      }
    }

    const totalCount: number = (await this.noteModel.find(getFindParams()))
      .length

    const events = await this.noteModel
      .find(getFindParams())
      .sort({ id: -1 })
      .limit(_limit)
      .skip(_limit * (_page - 1))
      .populate('user', 'fullName avatarUrl')
      .populate('group', 'title avatarUrl')
      .exec()

    return { events, totalCount }
  }
}
