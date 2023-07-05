import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
// import { CreateRoomDto } from './dto/create-room.dto'
// import { UpdateRoomDto } from './dto/update-room.dto'
import { User, UserDocument } from 'src/account/users/users.schema'
import { Room, RoomDocument } from './rooms.schema'

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  // async create(room: CreateRoomDto) {
  //   room.created = new Date().getTime()
  //   room.updated = new Date().getTime()

  //   const newRoom = new this.roomModel(room)
  //   newRoom.save()

  //   return newRoom
  // }

  async findAll(query: any, user: User) {
    const my_id = user._id
    const _limit = query._limit ? parseInt(query._limit) : 8
    const _page = query._page ? parseInt(query._page) : 1

    const totalCount: number = (
      await this.roomModel.find({
        $and: [{ users: { $in: [my_id] } }, { lastMessage: { $ne: '' } }],
      })
    ).length

    const rooms = await this.roomModel
      .find({
        $and: [{ users: { $in: [my_id] } }, { lastMessage: { $ne: '' } }],
      })
      .sort({ updated: 1 })
      .limit(_limit)
      .skip(_limit * (_page - 1))
      .populate('users', 'fullName avatarUrl')
      .exec()

    return { rooms, totalCount }
  }

  async findOne(id: string, user: User) {
    const my_id = user._id
    const user_id = id

    const room = await this.roomModel.findOne({
      users: { $all: [my_id, user_id] },
    })

    if (!room) {
      const newRoom = new this.roomModel({
        id: new Date().getTime(),
        users: [my_id, user_id],
        lastMessage: '',
        created: new Date().getTime(),
        updated: new Date().getTime(),
      })

      newRoom.save()

      return newRoom
    }

    return room
  }

  async findUsers(query: any, user: User) {
    const my_id = user._id
    const userName = query.name ? query.name : null
    const _limit = query._limit ? parseInt(query._limit) : 1000
    const _page = query._page ? parseInt(query._page) : 1

    function getParams() {
      const filter = { $and: [] }

      filter.$and = [
        { subscribers: { $in: [my_id] } },
        { subscriptionsUser: { $in: [my_id] } },
      ]

      if (userName) filter.$and.push({ fullName: new RegExp(userName, 'i') })

      return filter
    }

    const totalCount: number = (await this.userModel.find(getParams())).length

    const users = await this.userModel
      .find(getParams())
      .sort({ updated: 1 })
      .limit(_limit)
      .skip(_limit * (_page - 1))
      .exec()

    return { users, totalCount }
  }

  // update(id: number, updateRoomDto: UpdateRoomDto) {
  //   return `This action updates a #${id} room`
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} room`
  // }
}
