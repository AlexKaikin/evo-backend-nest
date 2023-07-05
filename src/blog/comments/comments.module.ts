import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AdminCommentsController } from './comments.admin.controller'
import { AdminCommentsService } from './comments.admin.service'
import { CommentsController } from './comments.controller'
import { CommentSchema } from './comments.schema'
import { CommentsService } from './comments.service'
import { Comment } from './entities/comment.entity'

@Module({
  controllers: [CommentsController, AdminCommentsController],
  providers: [CommentsService, AdminCommentsService],
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
})
export class CommentsModule {}
