import {
  Body,
  Controller,
  //Delete,
  Get,
  Param,
  //Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common'
import { Response } from 'express'
import { Auth } from 'src/account/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/account/auth/decorators/user.decorator'
import { User } from 'src/account/users/users.schema'
import { CreateMessageDto } from './dto/create-message.dto'
//import { UpdateMessageDto } from './dto/update-message.dto'
import { Message } from './messages.schema'
import { MessagesService } from './messages.service'

@Controller('api/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @Auth()
  create(@Body() createMessageDto: CreateMessageDto): Promise<Message> {
    return this.messagesService.create(createMessageDto)
  }

  @Get(':id')
  @Auth()
  async findAll(
    @Param('id') id: string,
    @Query() query: any,
    @CurrentUser() currentUser: User,
    @Res() res: Response
  ): Promise<Response> {
    const { messages, totalCount }: any = await this.messagesService.findAll(
      id,
      query,
      currentUser
    )

    res.append('Access-Control-Expose-Headers', 'X-Total-Count')

    return res.set({ 'X-Total-Count': totalCount }).json(messages)
  }

  // @Get(':id')
  // @Auth()
  // findOne(@Param('id') id: string) {
  //   return this.messagesService.findOne(+id)
  // }

  // @Patch(':id')
  // @Auth()
  // update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
  //   return this.messagesService.update(+id, updateMessageDto)
  // }

  // @Delete(':id')
  // @Auth()
  // remove(@Param('id') id: string) {
  //   return this.messagesService.remove(+id)
  // }
}
