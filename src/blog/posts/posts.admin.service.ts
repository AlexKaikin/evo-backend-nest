import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { Post, PostDocument } from './posts.schema'
import { User } from 'src/account/users/users.schema'

@Injectable()
export class AdminPostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  create(post: CreatePostDto, user: User) {
    post.id = new Date().getTime()
    post.created = new Date().getTime()
    post.updated = new Date().getTime()
    post.user = user._id

    const newPost = new this.postModel(post)
    newPost.save()

    return newPost
  }

  async findAll(query: any): Promise<{ posts: Post[]; totalCount: number }> {
    const q = query.q ? query.q : null

    const category = query.category ? query.category : null

    const _sort = query._sort ? query._sort : null
    const _order = query._order ? query._order : null
    const _limit = query._limit ? parseInt(query._limit) : 8
    const _page = query._page ? parseInt(query._page) : 1

    function getFindParams() {
      const filter: any = {}

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

  async findOne(id: number): Promise<Post> {
    const post = await this.postModel.findOneAndUpdate(
      { id: id },
      { $inc: { viewsCount: 1 } },
      { returnDocument: 'after' }
    )

    if (!post) throw new NotFoundException('Post not found')

    return post
  }

  async update(id: number, post: UpdatePostDto, user: User): Promise<Post> {
    post.updated = new Date().getTime()
    post.user = user._id

    const updatePost = await this.postModel.findOneAndUpdate(
      { id: post.id },
      post,
      { new: true }
    )

    return updatePost
  }

  remove(id: number) {
    return this.postModel.findOneAndDelete({ id })
  }
}
