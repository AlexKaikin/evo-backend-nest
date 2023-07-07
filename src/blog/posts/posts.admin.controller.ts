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
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { AdminPostsService } from './posts.admin.service'
import { Post as PostFromSchema } from './posts.schema'
import { Auth } from 'src/account/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/account/auth/decorators/user.decorator'
import { User } from 'src/account/users/users.schema'

@Controller('api/admin/posts')
export class AdminPostsController {
  constructor(private readonly adminPostsService: AdminPostsService) {}

  @Post()
  @Auth('admin')
  create(@Body() newPost: CreatePostDto, @CurrentUser() user: User) {
    return this.adminPostsService.create(newPost, user)
  }

  @Get()
  @Auth('admin')
  async findAll(@Query() query: any, @Res() res: Response): Promise<Response> {
    const { posts, totalCount }: any = await this.adminPostsService.findAll(
      query
    )

    res.append('Access-Control-Expose-Headers', 'X-Total-Count')

    return res.set({ 'X-Total-Count': totalCount }).json(posts)
  }

  @Get(':id')
  @Auth('admin')
  findOne(@Param('id') id: string): Promise<PostFromSchema> {
    return this.adminPostsService.findOne(+id)
  }

  @Patch(':id')
  @Auth('admin')
  update(
    @Param('id') id: string,
    @Body() updatePost: UpdatePostDto,
    @CurrentUser() user: User
  ): Promise<PostFromSchema> {
    return this.adminPostsService.update(+id, updatePost, user)
  }

  @Delete(':id')
  @Auth('admin')
  remove(@Param('id') id: string): Promise<PostFromSchema> {
    return this.adminPostsService.remove(+id)
  }
}
