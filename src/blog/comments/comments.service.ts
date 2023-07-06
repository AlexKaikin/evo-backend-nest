import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from 'src/account/users/users.schema'
import { Comment, CommentDocument } from './comments.schema'
import { CreateCommentDto } from './dto/create-comment.dto'

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>
  ) {}

  async create(comment: CreateCommentDto, user: User) {
    comment.id = new Date().getTime()
    comment.created = new Date().getTime()
    comment.updated = new Date().getTime()
    comment.user = user._id

    const newComment = new this.commentModel(comment)
    newComment.save()

    return newComment
  }

  async findAllForAccount(
    query: any,
    currentUser: User
  ): Promise<{ comments: Comment[]; totalCount: number }> {
    const _limit = query._limit ? parseInt(query._limit) : 8
    const _page = query._page ? parseInt(query._page) : 1

    const totalCount: number = (
      await this.commentModel.find({ user: currentUser })
    ).length

    const comments = await this.commentModel
      .find({ user: currentUser })
      .limit(_limit)
      .skip(_limit * (_page - 1))
      .populate('user')
      .populate('product', 'title id')
      .exec()

    return { comments, totalCount }
  }

  async findAllForPost(
    id: string,
    query: any
  ): Promise<{ comments: Comment[]; totalCount: number }> {
    const post_id = id
    const _limit = query._limit ? parseInt(query._limit) : 8
    const _page = query._page ? parseInt(query._page) : 1

    const totalCount: number = (
      await this.commentModel.find({ post: post_id, published: 'Одобрен' })
    ).length

    const comments = await this.commentModel
      .find({ post: post_id, published: 'Одобрен' })
      .limit(_limit)
      .skip(_limit * (_page - 1))
      .populate('user', 'fullName avatarUrl')
      .exec()

    return { comments, totalCount }
  }

  async findOne(id: number) {
    const comment = await this.commentModel.findOne({ id })

    if (!comment) throw new NotFoundException('Comment not found')

    return comment
  }
}
