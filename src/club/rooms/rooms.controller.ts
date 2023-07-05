import { Controller, Get, Param, Query, Res } from '@nestjs/common'
import { Response } from 'express'
import { Auth } from 'src/account/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/account/auth/decorators/user.decorator'
import { User } from 'src/account/users/users.schema'
import { Room } from './rooms.schema'
import { RoomsService } from './rooms.service'

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  // @Post()
  // @Auth()
  // create(@Body() createRoomDto: CreateRoomDto): Promise<Room> {
  //   return this.roomsService.create(createRoomDto)
  // }

  @Get()
  @Auth()
  async findAll(
    @Query() query: any,
    @CurrentUser() currentUser: User,
    @Res() res: Response
  ): Promise<Response> {
    const { rooms, totalCount }: any = await this.roomsService.findAll(
      query,
      currentUser
    )

    return res.set({ 'X-Total-Count': totalCount }).json(rooms)
  }

  @Get(':id')
  @Auth()
  findOne(
    @Param('id') id: string,
    @CurrentUser() currentUser: User
  ): Promise<Room> {
    return this.roomsService.findOne(id, currentUser)
  }

  @Get()
  @Auth()
  async findUsers(
    @Query() query: any,
    @CurrentUser() currentUser: User,
    @Res() res: Response
  ): Promise<Response> {
    const { users, totalCount }: any = await this.roomsService.findUsers(
      query,
      currentUser
    )

    return res.set({ 'X-Total-Count': totalCount }).json(users)
  }

  // @Patch(':id')
  // @Auth()
  // update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
  //   return this.roomsService.update(+id, updateRoomDto)
  // }

  // @Delete(':id')
  // @Auth()
  // remove(@Param('id') id: string) {
  //   return this.roomsService.remove(+id)
  // }
}
