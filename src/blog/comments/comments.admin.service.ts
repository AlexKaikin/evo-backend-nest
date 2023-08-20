import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Comment, CommentDocument } from './comments.schema'
import { UpdateCommentDto } from './dto/update-comment.dto'

@Injectable()
export class AdminCommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>
  ) {}

  async findAll(
    query: any
  ): Promise<{ comments: Comment[]; totalCount: number }> {
    const _sort = query._sort ? query._sort : 'id'
    const _order = query._order ? query._order : 'desc'
    const _limit = query._limit ? parseInt(query._limit) : 8
    const _page = query._page ? parseInt(query._page) : 1
    const totalCount: number = (await this.commentModel.find()).length
    const comments = await this.commentModel
      .find()
      .sort({ [_sort]: _order === 'desc' ? -1 : 1 })
      .limit(_limit)
      .skip(_limit * (_page - 1))
      .populate('user')
      .populate('post', 'title id')
      .exec()
    return { comments, totalCount }
  }

  async findOne(id: number) {
    const comment = await this.commentModel.findOne({ id })
    if (!comment) throw new NotFoundException('Comment not found')
    return comment
  }

  async update(id: number, comment: UpdateCommentDto) {
    comment.updated = new Date().getTime()
    const updatedComment = await this.commentModel.findOneAndUpdate(
      { id },
      { ...comment }
    )
    return updatedComment
  }

  async remove(id: number) {
    const comment = await this.commentModel.findOneAndDelete({ id })
    return comment
  }
}
