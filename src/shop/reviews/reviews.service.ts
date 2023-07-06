import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from 'src/account/users/users.schema'
import { CreateReviewDto } from './dto/create-review.dto'
import { UpdateReviewDto } from './dto/update-review.dto'
import { Review, ReviewDocument } from './reviews.schema'

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>
  ) {}

  async create(review: CreateReviewDto, user: User) {
    review.id = new Date().getTime()
    review.created = new Date().getTime()
    review.updated = new Date().getTime()
    review.user = user._id

    const newReview = new this.reviewModel(review)
    newReview.save()

    return newReview
  }

  async findAllForAccount(
    query: any,
    currentUser: User
  ): Promise<{ reviews: Review[]; totalCount: number }> {
    const _limit = query._limit ? parseInt(query._limit) : 8
    const _page = query._page ? parseInt(query._page) : 1

    const totalCount: number = (
      await this.reviewModel.find({ user: currentUser })
    ).length

    const reviews = await this.reviewModel
      .find({ user: currentUser })
      .limit(_limit)
      .skip(_limit * (_page - 1))
      .populate('user')
      .populate('product', 'title id')
      .exec()

    return { reviews, totalCount }
  }

  async findAllForProduct(
    id: string,
    query: any
  ): Promise<{ reviews: Review[]; totalCount: number }> {
    const product_id = id
    const _limit = query._limit ? parseInt(query._limit) : 8
    const _page = query._page ? parseInt(query._page) : 1

    const totalCount: number = (
      await this.reviewModel.find({ product: product_id, published: 'Одобрен' })
    ).length

    const reviews = await this.reviewModel
      .find({ product: product_id, published: 'Одобрен' })
      .limit(_limit)
      .skip(_limit * (_page - 1))
      .populate('user')
      .populate('product', 'title id')
      .exec()

    return { reviews, totalCount }
  }

  async findOne(id: number) {
    const review = await this.reviewModel.findOne({ id })

    if (!review) throw new NotFoundException('Review not found')

    return review
  }

  async update(id: number, review: UpdateReviewDto, _id: string) {
    const updatedReview = await this.reviewModel.findOneAndUpdate(
      { id, _id },
      {
        rating: review.rating,
        body: review.body,
        published: 'На модерации',
        updated: new Date().getTime(),
        product: review.product,
        user: review._id,
      }
    )

    return updatedReview
  }

  async remove(id: number, _id: string) {
    const review = await this.reviewModel.findOneAndDelete({ id, _id })

    return review
  }
}
