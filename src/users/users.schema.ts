import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Document } from 'mongoose'

export type UserDocument = User & Document
@Schema()
export class User {
  @Prop()
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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  subscribers: string[]

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  subscriptionsUser: string[]

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Group' })
  subscriptionsGroup: string[]

  @Prop()
  created: number

  @Prop()
  updated: number
}

export const UserSchema = SchemaFactory.createForClass(User)
