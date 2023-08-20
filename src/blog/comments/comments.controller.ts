import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common'
import { Response } from 'express'
import { Auth } from 'src/account/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/account/auth/decorators/user.decorator'
import { User } from 'src/account/users/users.schema'
import { Comment } from './comments.schema'
import { CommentsService } from './comments.service'
import { CreateCommentDto } from './dto/create-comment.dto'

@Controller('api')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('comments')
  @Auth()
  create(
    @Body() createComment: CreateCommentDto,
    @CurrentUser() currentUser: User
  ): Promise<Comment> {
    return this.commentsService.create(createComment, currentUser)
  }

  @Get('/profile/comments')
  @Auth()
  async findAllForAccount(
    @CurrentUser() currentUser: User,
    @Query() query: any,
    @Res() res: Response
  ): Promise<Response> {
    const { comments, totalCount }: any =
      await this.commentsService.findAllForAccount(query, currentUser)

    res.append('Access-Control-Expose-Headers', 'X-Total-Count')

    return res.set({ 'X-Total-Count': totalCount }).json(comments)
  }

  @Get('posts/:id/comments')
  async findAllForPost(
    @Param('id') id: string,
    @Query() query: any,
    @Res() res: Response
  ): Promise<Response> {
    const { comments, totalCount }: any =
      await this.commentsService.findAllForPost(id, query)

    res.append('Access-Control-Expose-Headers', 'X-Total-Count')

    return res.set({ 'X-Total-Count': totalCount }).json(comments)
  }

  @Get('comments/:id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id)
  }
}
