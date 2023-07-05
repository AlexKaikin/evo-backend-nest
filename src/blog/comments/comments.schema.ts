import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Document, Types } from 'mongoose'

export type CommentDocument = Comment & Document
@Schema()
export class Comment {
  @Prop({ unique: true })
  id: number

  @Prop({ required: true })
  body: string

  @Prop({ default: 'На модерации' })
  published: boolean

  @Prop()
  created: number

  @Prop()
  updated: number

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true })
  post: Types.ObjectId
}

export const CommentSchema = SchemaFactory.createForClass(Comment)
