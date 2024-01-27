import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Post, PostDocument } from './posts.schema'

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async findAll(query: any): Promise<{ posts: Post[]; totalCount: number }> {
    const q = query.q ? query.q : null

    const category = query.category ? query.category : null

    const _sort = query._sort ? query._sort : 'id'
    const _order = query._order ? query._order : 'desc'
    const _limit = query._limit ? parseInt(query._limit) : 8
    const _page = query._page ? parseInt(query._page) : 1

    function getFindParams() {
      const filter: any = {}
      filter.published = true

      if (q) filter.title = new RegExp(q, 'i')
      if (category) filter.category = category

      return filter
    }

    const totalCount: number = (await this.postModel.find(getFindParams()))
      .length
    const posts = await this.postModel
      .find(getFindParams())
      .sort({ [_sort]: _order === 'desc' ? -1 : 1 })
      .limit(_limit)
      .skip(_limit * (_page - 1))
      .populate('user')
      .exec()

    return { posts, totalCount }
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postModel.findOneAndUpdate(
      { _id: id },
      { $inc: { viewsCount: 1 } },
      { returnDocument: 'after' }
    )

    if (!post) throw new NotFoundException('Post not found')

    return post
  }
}
