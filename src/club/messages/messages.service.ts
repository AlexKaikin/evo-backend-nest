import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from 'src/account/users/users.schema'
import { Room, RoomDocument } from '../rooms/rooms.schema'
import { CreateMessageDto } from './dto/create-message.dto'
//import { UpdateMessageDto } from './dto/update-message.dto'
import { Message, MessageDocument } from './messages.schema'

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>
  ) {}

  async create(message: CreateMessageDto) {
    const newMessage = new this.messageModel(message)

    await this.roomModel.updateOne(
      { _id: message.roomID },
      { $set: { lastMessage: message.text, updated: new Date().getTime() } }
    )

    newMessage.save()

    return newMessage
  }

  async findAll(
    id: string,
    query: any,
    user: User
  ): Promise<{ messages: Message[]; totalCount: number }> {
    const user_id = id
    const my_id = user._id.toString()

    const _limit = query._limit ? parseInt(query._limit) : 0
    const _page = query._page ? parseInt(query._page) : 1

    const totalCount: number = (
      await this.messageModel.find({ room: { $all: [my_id, user_id] } })
    ).length

    const messages = await this.messageModel
      .find({ room: { $all: [my_id, user_id] } })
      .sort({ id: -1 })
      .limit(_limit)
      .skip(_limit * (_page - 1))
      .populate('user', 'id fullName avatarUrl')
      .exec()

    return { messages, totalCount }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} message`
  // }

  // update(id: number, updateMessageDto: UpdateMessageDto) {
  //   return `This action updates a #${id} message`
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} message`
  // }
}
