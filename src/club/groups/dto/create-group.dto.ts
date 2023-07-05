export class CreateGroupDto {
  _id: string
  id: number
  title: string
  about: string
  location: string
  private: boolean
  subscribers: SubscriptionsUserType[]
  avatarUrl: string | null
  creator: string
  created: number
  updated: number
  __v?: number
}

class SubscriptionsUserType {
  _id: string
  id: number
  fullName: string
  avatarUrl: string
}
