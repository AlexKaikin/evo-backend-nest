import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from 'src/account/users/users.schema'
import { CreateGroupDto } from './dto/create-group.dto'
import { UpdateGroupDto } from './dto/update-group.dto'
import { Group, GroupDocument } from './groups.schema'

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>
  ) {}

  async create(group: CreateGroupDto, user: User) {
    group.id = new Date().getTime()
    group.creator = user._id
    group.created = new Date().getTime()

    const newGroup = new this.groupModel(group)
    newGroup.save()

    return newGroup
  }

  async findAll(query: any): Promise<{ groups: Group[]; totalCount: number }> {
    const _limit = query._limit ? parseInt(query._limit) : 8
    const _page = query._page ? parseInt(query._page) : 1

    const totalCount: number = (await this.groupModel.find()).length

    const groups = await this.groupModel
      .find()
      .sort({ id: -1 })
      .limit(_limit)
      .skip(_limit * (_page - 1))
      .populate('creator', 'fullName avatarUrl')
      .exec()

    return { groups, totalCount }
  }

  async findOne(id: number): Promise<Group> {
    const group = await this.groupModel
      .findOne({ id })
      .populate('subscribers', 'id fullName avatarUrl')

    if (!group) throw new NotFoundException('Group not found')

    return group
  }

  async update(id: number, group: UpdateGroupDto) {
    group.updated = new Date().getTime()

    const updatedGroup = await this.groupModel.findOneAndUpdate(
      { id },
      { ...group }
    )

    return updatedGroup
  }

  async remove(id: number) {
    const group = await this.groupModel.findOneAndDelete({ id })

    return group
  }
}
