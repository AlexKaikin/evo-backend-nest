import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { GroupsController } from './groups.controller'
import { Group, GroupSchema } from './groups.schema'
import { GroupsService } from './groups.service'

@Module({
  controllers: [GroupsController],
  providers: [GroupsService],
  imports: [
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
  ],
})
export class GroupsModule {}
