import { Controller, Get, Param, Query, Res } from '@nestjs/common'
import { Response } from 'express'
import { Post } from './posts.schema'
import { PostsService } from './posts.service'

@Controller('api/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll(@Query() query: any, @Res() res: Response): Promise<Response> {
    const { posts, totalCount }: any = await this.postsService.findAll(query)

    res.append('Access-Control-Expose-Headers', 'X-Total-Count')

    return res.set({ 'X-Total-Count': totalCount }).json(posts)
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Post> {
    return this.postsService.findOne(id)
  }
}
