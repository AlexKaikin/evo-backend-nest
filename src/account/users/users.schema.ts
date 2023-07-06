import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Exclude } from 'class-transformer'
import mongoose, { Document } from 'mongoose'
import { Group } from 'src/club/groups/groups.schema'

export type UserDocument = User & Document
@Schema()
export class User {
  @Exclude()
  _id: string

  @Prop({ unique: true })
  id: number

  @Prop({ unique: true, required: true })
  fullName: string

  @Prop({ default: '' })
  about: string

  @Prop({ default: '' })
  location: string

  @Prop({ default: false })
  private: boolean

  @Prop({ default: '' })
  avatarUrl: string

  @Prop({ default: [] })
  interests: string[]

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true })
  passwordHash: string

  @Prop({ default: 'user' })
  role: string

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  subscribers: User[]

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  subscriptionsUser: User[]

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }] })
  subscriptionsGroup: Group[]

  @Prop()
  created: number

  @Prop()
  updated: number
}

export const UserSchema = SchemaFactory.createForClass(User)
