import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Document } from 'mongoose'

export type OrderDocument = Order & Document
@Schema()
export class Order {
  @Prop({ unique: true })
  id: number

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  surname: string

  @Prop({ required: true })
  middleName: string

  @Prop({ required: true })
  region: string

  @Prop({ required: true })
  city: string

  @Prop({ required: true })
  street: string

  @Prop({ required: true })
  home: string

  @Prop({ required: true })
  index: number

  @Prop({ default: 'Ожидает оплаты' })
  status: string

  @Prop()
  cartItems: {
    cost: { type: number }
    id: { type: number }
    imgUrl: { type: string }
    price: { type: number }
    quantity: { type: number }
    title: { type: string }
  }[]

  @Prop()
  totalCost: number

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: string

  @Prop()
  created: number

  @Prop()
  updated: number
}

export const OrderSchema = SchemaFactory.createForClass(Order)
