import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Exclude } from 'class-transformer'
import mongoose, { Document } from 'mongoose'
import { User } from 'src/account/users/users.schema'

export type GroupDocument = Group & Document
@Schema()
export class Group {
  @Exclude()
  _id: string

  @Prop({ unique: true })
  id: number

  @Prop({ unique: true, required: true })
  title: string

  @Prop({ default: '' })
  about: string

  @Prop({ default: '' })
  location: string

  @Prop({ default: false })
  private: boolean

  @Prop({ default: true })
  active: boolean

  @Prop({ default: '' })
  avatarUrl: string

  @Prop({ default: [] })
  interests: string[]

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  subscribers: User[]

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  creator: string

  @Prop()
  created: number

  @Prop()
  updated: number
}

export const GroupSchema = SchemaFactory.createForClass(Group)
