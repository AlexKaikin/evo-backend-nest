export class CreateNoteDto {
  _id: string
  id: number
  galleryUrl: string[]
  text: string
  tags: string[]
  published: boolean
  user?: string | null
  group?: string | null
  created?: number
}
