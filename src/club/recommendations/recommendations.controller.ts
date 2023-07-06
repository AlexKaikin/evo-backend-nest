import {
  Controller,
  //Delete,
  Get,
  Query,
  Res,
} from '@nestjs/common'
import { Response } from 'express'
import { Auth } from 'src/account/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/account/auth/decorators/user.decorator'
import { User } from 'src/account/users/users.schema'
import { RecommendationsService } from './recommendations.service'

@Controller('api/recommendations')
export class RecommendationsController {
  constructor(
    private readonly recommendationsService: RecommendationsService
  ) {}

  @Get()
  @Auth()
  async findAll(
    @Query() query: any,
    @CurrentUser() currentUser: User,
    @Res() res: Response
  ): Promise<Response> {
    const { recommendations, totalCount }: any =
      await this.recommendationsService.findAll(query, currentUser)

    res.append('Access-Control-Expose-Headers', 'X-Total-Count')

    return res.set({ 'X-Total-Count': totalCount }).json(recommendations)
  }
}
