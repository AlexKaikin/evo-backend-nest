export class CreateReviewDto {
  _id: string
  id: number
  rating: number
  body: string
  published: string
  created: number
  updated: number
  product: string | ProductType
  user?: any
}

export class ProductType {
  _id: string
  title: string
  id: number
}
