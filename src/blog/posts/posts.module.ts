import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AdminPostsController } from './posts.admin.controller'
import { AdminPostsService } from './posts.admin.service'
import { PostsController } from './posts.controller'
import { PostSchema } from './posts.schema'
import { Post } from './entities/post.entity'
import { PostsService } from './posts.service'

@Module({
  providers: [PostsService, AdminPostsService],
  controllers: [PostsController, AdminPostsController],
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
})
export class PostsModule {}
