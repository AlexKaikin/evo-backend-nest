export class CreateUserDto {
  id: number
  fullName: string
  about: string
  interests: string[]
  location: string
  private: boolean
  avatarUrl: string
  subscribers: SubscriptionsUserType[]
  subscriptionsUser: SubscriptionsUserType[]
  subscriptionsGroup: SubscriptionsGroupType[]
  email: string
  created: number
  updated: number
}

type SubscriptionsUserType = {
  _id: string
  id: number
  fullName: string
  avatarUrl: string
}

type SubscriptionsGroupType = {
  _id: string
  id: number
  title: string
  avatarUrl: string
}
