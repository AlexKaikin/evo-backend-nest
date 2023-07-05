export class CreateOrderDto {
  _id?: number
  id: number
  name: string
  surname: string
  middleName: string
  region: string
  city: string
  street: string
  home: string
  index: number
  cartItems: CartItemType[]
  totalCost: number
  status: string
  created: number
  updated: number
  user: string
}

export class CartItemType {
  id: number
  title: string
  imgUrl: string
  price: number
  cost: number
  quantity: number
}
