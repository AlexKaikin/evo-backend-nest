import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose'
import mongoose, { Document, Types } from 'mongoose'

export type ProductDocument = Product & Document
@Schema()
export class Product {
  @Prop({ unique: true })
  id: number

  @Prop({ unique: true, required: true })
  title: string

  @Prop({ required: true })
  text: string

  @Prop({ default: [] })
  tags: string[]

  @Prop({ required: true })
  price: number

  @Prop({ required: true })
  quantity: number

  @Prop({ required: true })
  currency: string

  @Prop({ required: true })
  volume: number

  @Prop({ required: true })
  volumeMeasurement: string

  @Prop({ required: true })
  imgUrl: string

  @Prop({ default: [] })
  galleryUrl: string[]

  @Prop({ default: 0 })
  rating: number

  @Prop({ default: 0 })
  ratingCount: number

  @Prop({ required: true })
  category: string

  @Prop({ required: true })
  manufacturer: string

  @Prop(
    raw({
      country: { type: String },
      town: { type: String },
      year: { type: Number },
    })
  )
  property: Record<string, any>

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

export const ProductSchema = SchemaFactory.createForClass(Product)
