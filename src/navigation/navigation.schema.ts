import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type NavigationDocument = Navigation & Document
@Schema()
export class Navigation {
  @Prop({ unique: true })
  id: number

  @Prop({ required: true })
  title: string

  @Prop({ required: true })
  url: string

  @Prop()
  filter: { id: number; title: string; type: string }[]

  @Prop()
  sort: { id: number; title: string; type: string }[]
}

export const NavigationSchema = SchemaFactory.createForClass(Navigation)
