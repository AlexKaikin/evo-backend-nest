import { IsEmail, MinLength } from 'class-validator'

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

  @IsEmail()
  email: string

  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  passwordHash: string

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
