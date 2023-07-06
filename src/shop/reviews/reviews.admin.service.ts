import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Product, ProductDocument } from '../products/products.schema'
import { UpdateReviewDto } from './dto/update-review.dto'
import { Review, ReviewDocument } from './reviews.schema'

@Injectable()
export class AdminReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>
  ) {}

  async findAll(
    query: any
  ): Promise<{ reviews: Review[]; totalCount: number }> {
    const _limit = query._limit ? parseInt(query._limit) : 8
    const _page = query._page ? parseInt(query._page) : 1

    const totalCount: number = (await this.reviewModel.find()).length

    const reviews = await this.reviewModel
      .find()
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

  async update(id: number, review: UpdateReviewDto) {
    review.updated = new Date().getTime()

    const updatedReview = await this.reviewModel.findOneAndUpdate(
      { id },
      { ...review }
    )

    const reviewsByProduct = await this.reviewModel.find({
      $and: [{ product: review.product }, { published: 'Одобрен' }],
    })

    await this.productModel.updateOne(
      { _id: review.product },
      {
        $set: {
          rating: getRating(),
          ratingCount: getRatingCount(),
        },
      }
    )

    function getRating() {
      if (reviewsByProduct.length) {
        const rewiewArr = reviewsByProduct.map(item => item.rating)
        const rewiewArrNeed = rewiewArr.filter(item => item !== 0)
        const ratingSum = rewiewArrNeed.reduce((a, b) => a + b)

        return Math.ceil(ratingSum / rewiewArrNeed.length)
      } else {
        return 0
      }
    }

    function getRatingCount() {
      const ratingsByProduct = reviewsByProduct.map(item => item.rating)
      const rewiewArrNeed = ratingsByProduct.filter(item => item !== 0)

      return rewiewArrNeed.length
    }

    return updatedReview
  }

  async remove(id: number) {
    const review = await this.reviewModel.findOneAndDelete({ id })

    return review
  }
}
