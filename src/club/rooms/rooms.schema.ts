import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Exclude } from 'class-transformer'
import mongoose, { Document } from 'mongoose'
import { User } from 'src/account/users/users.schema'

export type RoomDocument = Room & Document
@Schema()
export class Room {
  @Exclude()
  _id: string

  @Prop({ unique: true })
  id: number

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  users: User[]

  @Prop({ default: '' })
  lastMessage: string

  @Prop()
  created: number

  @Prop()
  updated: number
}

export const RoomSchema = SchemaFactory.createForClass(Room)
