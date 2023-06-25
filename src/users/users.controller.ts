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
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './users.schema'
import { UsersService } from './users.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Auth()
  @Get()
  async findAll(
    @CurrentUser() user: User,
    @Query() query: any,
    @Res() res: Response
  ): Promise<Response> {
    query.currentUser = user
    const { users, totalCount }: any = await this.usersService.findAll(query)

    return res.set({ 'X-Total-Count': totalCount }).json(users)
  }

  @Auth()
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id)
  }

  @Auth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }

  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id)
  }
}
