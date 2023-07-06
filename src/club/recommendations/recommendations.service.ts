import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from 'src/account/users/users.schema'

@Injectable()
export class RecommendationsService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(query: any, user: User) {
    const user_id = user._id
    const _limit = query._limit ? parseInt(query._limit) : 0
    const _page = query._page ? parseInt(query._page) : 1

    const myProfile = await this.userModel.findOne({ _id: user_id })

    function getFindParams() {
      return {
        $and: [
          {
            interests: { $in: myProfile.interests },
          },
          { _id: { $ne: myProfile._id } },
          { subscribers: { $ne: myProfile._id } },
        ],
      }
    }

    const totalCount: number = (await this.userModel.find(getFindParams()))
      .length

    const recommendations = await this.userModel
      .find(getFindParams())
      .sort({ id: -1 })
      .limit(_limit)
      .skip(_limit * (_page - 1))
      .exec()

    return { recommendations, totalCount }
  }
}
