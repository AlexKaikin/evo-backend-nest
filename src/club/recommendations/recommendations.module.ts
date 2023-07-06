import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from 'src/account/users/users.schema'
import { RecommendationsController } from './recommendations.controller'
import { RecommendationsService } from './recommendations.service'

@Module({
  controllers: [RecommendationsController],
  providers: [RecommendationsService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class RecommendationsModule {}
