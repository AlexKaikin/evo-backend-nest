import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UpdateUserDto } from './dto/update-user.dto'
import { User, UserDocument } from './users.schema'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(query: any, currentUser: User) {
    const user_id = currentUser._id
    const q = query.q ? query.q : null
    const _limit = query._limit ? parseInt(query._limit) : 8
    const _page = query._page ? parseInt(query._page) : 1

    function getFindParams() {
      const params: any = {}
      params._id = { $ne: user_id }
      if (q) params.fullName = new RegExp(q, 'i')

      return params
    }

    const totalCount: number = (await this.userModel.find(getFindParams()))
      .length
    const users = await this.userModel
      .find(getFindParams())
      .sort({ id: -1 })
      .limit(_limit)
      .skip(_limit * (_page - 1))
      .exec()

    return { users, totalCount }
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findOne({ id: id })

    if (!user) throw new NotFoundException('User not found')

    return user
  }

  async update(id: string, user: UpdateUserDto): Promise<User> {
    user.updated = new Date().getTime()
    const updateUser = await this.userModel.findOneAndUpdate({ id }, user, {
      new: true,
    })
    return updateUser
  }

  remove(id: string) {
    return this.userModel.findOneAndDelete({ id })
  }
}
