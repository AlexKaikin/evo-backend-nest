import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Exclude } from 'class-transformer'
import mongoose, { Document } from 'mongoose'

export type MessageDocument = Message & Document
@Schema()
export class Message {
  @Exclude()
  _id: string

  @Prop({ unique: true })
  id: number

  @Prop()
  room: string[]

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true })
  roomID: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: string

  @Prop({ required: true })
  text: string

  @Prop({ required: true })
  date: string
}

export const MessageSchema = SchemaFactory.createForClass(Message)
