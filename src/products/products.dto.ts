export class CreateProductDto {
  _id: string
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
  rating: number
  ratingCount: number
  manufacturer: string
  property: PropertyType
  text: string
  published: boolean
  tags: string[]
  viewsCount: number
  user: string
  created: number
  updated: number
}

export class UpdateProductDto {
  _id: string
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
  rating: number
  ratingCount: number
  manufacturer: string
  property: PropertyType
  text: string
  published: boolean
  tags: string[]
  viewsCount: number
  user: string
  created: number
  updated: number
}

type PropertyType = {
  country: string
  town: string
  year: number
}
