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
    const user = await this.userModel
      .findOne({ _id: id })
      .populate('subscribers', 'id fullName avatarUrl')
      .populate('subscriptionsUser', 'id fullName avatarUrl')
      .populate('subscriptionsGroup', 'id title avatarUrl')

    if (!user) throw new NotFoundException('User not found')

    return user
  }

  async update(currentUser: User, user: UpdateUserDto): Promise<User> {
    if (currentUser.id !== user.id) throw new NotFoundException('Forbidden')

    user.updated = new Date().getTime()
    if (user.interests.length === 1 && user.interests[0] === '')
      user.interests = []

    const updateUser = await this.userModel.findOneAndUpdate(
      { id: currentUser.id },
      user,
      { new: true }
    )

    return updateUser
  }

  async followUser(
    id: string,
    user: User
  ): Promise<{ success: boolean; user_id: string }> {
    const user_id = user._id
    const followUser_id = id

    await this.userModel.updateOne(
      { _id: user_id },
      { $push: { subscriptionsUser: followUser_id } }
    )

    await this.userModel.updateOne(
      { _id: followUser_id },
      { $push: { subscribers: user_id } }
    )

    return { success: true, user_id: user_id }
  }

  async unFollowUser(
    id: string,
    user: User
  ): Promise<{ success: boolean; user_id: string }> {
    const user_id = user._id
    const followUser_id = id

    await this.userModel.updateOne(
      { _id: user_id },
      { $pull: { subscriptionsUser: followUser_id } }
    )

    await this.userModel.updateOne(
      { _id: followUser_id },
      { $pull: { subscribers: user_id } }
    )

    return { success: true, user_id: user_id }
  }

  remove(id: string) {
    return this.userModel.findOneAndDelete({ id })
  }
}
