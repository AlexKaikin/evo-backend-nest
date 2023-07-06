import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  //Post,
  Query,
  Res,
} from '@nestjs/common'
import { Response } from 'express'
import { Auth } from 'src/account/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/account/auth/decorators/user.decorator'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './users.schema'
import { UsersService } from './users.service'

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Auth()
  async findAll(
    @CurrentUser() currentUser: User,
    @Query() query: any,
    @Res() res: Response
  ): Promise<Response> {
    const { users, totalCount }: any = await this.usersService.findAll(
      query,
      currentUser
    )

    return res.set({ 'X-Total-Count': totalCount }).json(users)
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id)
  }

  @Patch()
  @Auth()
  update(
    @CurrentUser() currentUser: User,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(currentUser, updateUserDto)
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.usersService.remove(id)
  }

  @Patch('follow/:id')
  @Auth()
  followUser(@Param('id') id: string, @CurrentUser() currentUser: User) {
    return this.usersService.followUser(id, currentUser)
  }

  @Patch('unfollow/:id')
  @Auth()
  unFollowUser(@Param('id') id: string, @CurrentUser() currentUser: User) {
    return this.usersService.unFollowUser(id, currentUser)
  }
}
