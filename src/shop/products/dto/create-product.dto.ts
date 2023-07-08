export class CreateProductDto {
  id: number
  title: string
  imgUrl: string
  galleryUrl: string[]
  volume: number
  volumeMeasurement: string
  currency: string
  price: number
  quantity: number
  category: string
  manufacturer: string
  property: PropertyType
  text: string
  published: boolean
  tags: string[]
  user: string
  created: number
  updated: number
}

class PropertyType {
  country: string
  town: string
  year: number
}
