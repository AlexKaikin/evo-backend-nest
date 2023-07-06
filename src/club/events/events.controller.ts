import { Controller, Get, Query, Res } from '@nestjs/common'
import { Response } from 'express'
import { Auth } from 'src/account/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/account/auth/decorators/user.decorator'
import { User } from 'src/account/users/users.schema'
import { EventsService } from './events.service'

@Controller('api/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @Auth()
  async findAll(
    @Query() query: any,
    @CurrentUser() currentUser: User,
    @Res() res: Response
  ): Promise<Response> {
    const { events, totalCount }: any = await this.eventsService.findAll(
      query,
      currentUser
    )
    res.append('Access-Control-Expose-Headers', 'X-Total-Count')

    return res.set({ 'X-Total-Count': totalCount }).json(events)
  }
}
