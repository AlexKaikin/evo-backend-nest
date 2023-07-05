import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Document, Types } from 'mongoose'

export type PostDocument = Post & Document
@Schema()
export class Post {
  @Prop({ unique: true })
  id: number

  @Prop({ unique: true, required: true })
  title: string

  @Prop({ required: true })
  text: string

  @Prop({ default: [] })
  tags: string[]

  @Prop({ required: true })
  imgUrl: string

  @Prop({ default: [] })
  galleryUrl: string[]

  @Prop({ required: true })
  category: string

  @Prop({ default: 0 })
  viewsCount: number

  @Prop({ default: false })
  published: boolean

  @Prop()
  created: number

  @Prop()
  updated: number

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId
}

export const PostSchema = SchemaFactory.createForClass(Post)
