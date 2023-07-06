import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Exclude } from 'class-transformer'
import mongoose, { Document } from 'mongoose'

export type NoteDocument = Note & Document
@Schema()
export class Note {
  @Exclude()
  _id: string

  @Prop({ unique: true })
  id: number

  @Prop({ required: true })
  text: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Group' })
  group: string

  @Prop({ default: [] })
  tags: string[]

  @Prop({ default: [] })
  galleryUrl: string[]

  @Prop({ default: true })
  published: boolean

  @Prop()
  created: number

  @Prop()
  updated: number
}

export const NoteSchema = SchemaFactory.createForClass(Note)
