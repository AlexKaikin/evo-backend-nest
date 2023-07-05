export class CreateRoomDto {
  _id: string
  id: number
  users: UserType[]
  lastMessage: string
  created: number
  updated: number
}

class UserType {
  _id: string
  id: number
  fullName: string
  avatarUrl: string
}
