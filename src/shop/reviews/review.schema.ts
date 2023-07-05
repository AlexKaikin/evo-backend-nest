import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Document } from 'mongoose'

export type ReviewDocument = Review & Document
@Schema()
export class Review {
  @Prop({ unique: true })
  id: number

  @Prop({ required: true })
  body: string

  @Prop()
  rating: number

  @Prop({ default: 'На модерации' })
  published: string

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  })
  product: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: string

  @Prop()
  created: number

  @Prop()
  updated: number
}

export const ReviewSchema = SchemaFactory.createForClass(Review)
