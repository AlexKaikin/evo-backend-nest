import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  Res,
} from '@nestjs/common'
import { Response } from 'express'
import { Auth } from 'src/account/auth/decorators/auth.decorator'
import { UpdateReviewDto } from './dto/update-review.dto'
import { AdminReviewsService } from './reviews.admin.service'
import { Review } from './reviews.schema'

@Controller('api/admin/reviews')
export class AdminReviewsController {
  constructor(private readonly adminReviewsService: AdminReviewsService) {}

  @Get()
  @Auth('admin')
  async findAll(@Query() query: any, @Res() res: Response): Promise<Response> {
    const { reviews, totalCount }: any = await this.adminReviewsService.findAll(
      query
    )

    res.append('Access-Control-Expose-Headers', 'X-Total-Count')

    return res.set({ 'X-Total-Count': totalCount }).json(reviews)
  }

  @Get(':id')
  @Auth('admin')
  findOne(@Param('id') id: string): Promise<Review> {
    return this.adminReviewsService.findOne(+id)
  }

  @Patch(':id')
  @Auth('admin')
  update(
    @Param('id') id: string,
    @Body() review: UpdateReviewDto
  ): Promise<Review> {
    return this.adminReviewsService.update(+id, review)
  }

  @Delete(':id')
  @Auth('admin')
  remove(@Param('id') id: string) {
    return this.adminReviewsService.remove(+id)
  }
}
