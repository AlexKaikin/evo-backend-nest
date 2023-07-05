import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from 'src/account/users/users.schema'
import { RoomsController } from './rooms.controller'
import { Room, RoomSchema } from './rooms.schema'
import { RoomsService } from './rooms.service'

@Module({
  controllers: [RoomsController],
  providers: [RoomsService],
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class RoomsModule {}
