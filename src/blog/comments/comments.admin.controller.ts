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
import { AdminCommentsService } from './comments.admin.service'
import { UpdateCommentDto } from './dto/update-comment.dto'

@Controller('api/admin/comments')
export class AdminCommentsController {
  constructor(private readonly adminCommentsService: AdminCommentsService) {}

  @Get()
  @Auth('admin')
  async findAll(@Query() query: any, @Res() res: Response): Promise<Response> {
    const { reviews, totalCount }: any =
      await this.adminCommentsService.findAll(query)

    return res.set({ 'X-Total-Count': totalCount }).json(reviews)
  }

  @Get(':id')
  @Auth('admin')
  findOne(@Param('id') id: string) {
    return this.adminCommentsService.findOne(+id)
  }

  @Patch(':id')
  @Auth('admin')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.adminCommentsService.update(+id, updateCommentDto)
  }

  @Delete(':id')
  @Auth('admin')
  remove(@Param('id') id: string) {
    return this.adminCommentsService.remove(+id)
  }
}
