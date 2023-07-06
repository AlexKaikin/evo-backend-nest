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
import { CreateGroupDto } from './dto/create-group.dto'
import { UpdateGroupDto } from './dto/update-group.dto'
import { Group } from './groups.schema'
import { GroupsService } from './groups.service'

@Controller('api/groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  @Auth()
  create(
    @Body() createGroup: CreateGroupDto,
    @CurrentUser() currentUser: User
  ): Promise<Group> {
    return this.groupsService.create(createGroup, currentUser)
  }

  @Get()
  @Auth()
  async findAll(@Query() query: any, @Res() res: Response): Promise<Response> {
    const { groups, totalCount }: any = await this.groupsService.findAll(query)

    return res.set({ 'X-Total-Count': totalCount }).json(groups)
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.groupsService.findOne(id)
  }

  @Patch(':id')
  @Auth()
  update(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto
  ): Promise<Group> {
    return this.groupsService.update(+id, updateGroupDto)
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.groupsService.remove(+id)
  }

  @Patch('follow/:id')
  @Auth()
  followGroup(@Param('id') id: string, @CurrentUser() currentUser: User) {
    return this.groupsService.followGroup(id, currentUser)
  }

  @Patch('unfollow/:id')
  @Auth()
  unFollowGroup(@Param('id') id: string, @CurrentUser() currentUser: User) {
    return this.groupsService.unFollowGroup(id, currentUser)
  }
}
