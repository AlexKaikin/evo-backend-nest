import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Product, ProductSchema } from '../products/products.schema'
import { AdminReviewsController } from './reviews.admin.controller'
import { AdminReviewsService } from './reviews.admin.service'
import { ReviewsController } from './reviews.controller'
import { Review, ReviewSchema } from './reviews.schema'
import { ReviewsService } from './reviews.service'

@Module({
  controllers: [ReviewsController, AdminReviewsController],
  providers: [ReviewsService, AdminReviewsService],
  imports: [
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
})
export class ReviewsModule {}
