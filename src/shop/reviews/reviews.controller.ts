import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common'
import { Response } from 'express'
import { Auth } from 'src/account/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/account/auth/decorators/user.decorator'
import { User } from 'src/account/users/users.schema'
import { CreateReviewDto } from './dto/create-review.dto'
import { UpdateReviewDto } from './dto/update-review.dto'
import { ReviewsService } from './reviews.service'
import { Review } from './review.schema'

@Controller('api/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @Auth()
  create(
    @CurrentUser() currentUser: User,
    @Body() review: CreateReviewDto
  ): Promise<Review> {
    return this.reviewsService.create(review, currentUser)
  }

  @Get()
  @Auth()
  async findAllForAccount(
    @CurrentUser() currentUser: User,
    @Query() query: any,
    @Res() res: Response
  ): Promise<Response> {
    const { reviews, totalCount }: any =
      await this.reviewsService.findAllForAccount(query, currentUser)

    return res.set({ 'X-Total-Count': totalCount }).json(reviews)
  }

  @Get(':id')
  async findAllForProduct(
    @Param('id') id: string,
    @Query() query: any,
    @Res() res: Response
  ): Promise<Response> {
    const { reviews, totalCount }: any =
      await this.reviewsService.findAllForProduct(+id, query)

    return res.set({ 'X-Total-Count': totalCount }).json(reviews)
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Review> {
    return this.reviewsService.findOne(+id)
  }

  @Patch(':id')
  @Auth()
  update(
    @Param('id') id: string,
    @CurrentUser('_id') _id: string,
    @Body() review: UpdateReviewDto
  ): Promise<Review> {
    return this.reviewsService.update(+id, review, _id)
  }

  @Delete(':id')
  @Auth()
  remove(
    @Param('id') id: string,
    @CurrentUser('_id') _id: string
  ): Promise<Review> {
    return this.reviewsService.remove(+id, _id)
  }
}
