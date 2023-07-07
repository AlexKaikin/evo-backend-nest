import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { hash, verify } from 'argon2'
import { Model } from 'mongoose'
import { User, UserDocument } from '../users/users.schema'
import { RefreshTokenDto } from './dto/refresh-token.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async register(user: any) {
    const checkUser = await this.userModel.findOne({ fullName: user.fullName })

    if (checkUser) throw new BadRequestException('User already exists')

    user.id = new Date().getTime()
    user.created = new Date().getTime()
    user.updated = new Date().getTime()
    user.passwordHash = await hash(user.password)

    const newUser = new this.userModel(user)
    const saveduser = await newUser.save()
    const tokens = await this.issueTokens(user.id)

    return { user: saveduser, ...tokens }
  }

  private async issueTokens(userId: number) {
    const data = { id: userId }
    const accessToken = this.jwtService.sign(data, { expiresIn: '1d' })
    const refreshToken = this.jwtService.sign(data, { expiresIn: '7d' })

    return { accessToken, refreshToken }
  }

  async login(user: any) {
    const foundUser = await this.userModel
      .findOne({ email: user.email })
      .populate('subscribers', 'id fullName avatarUrl')
      .populate('subscriptionsUser', 'id fullName avatarUrl')
      .populate('subscriptionsGroup', 'id title avatarUrl')

    if (!foundUser) throw new NotFoundException('User not found')

    const passwordMatch = await verify(foundUser.passwordHash, user.password)

    if (!passwordMatch) throw new UnauthorizedException('Invalid password')

    const tokens = await this.issueTokens(foundUser.id)

    return { user: foundUser, ...tokens }
  }

  // async getNewToken(token: RefreshTokenDto) {
  //   const result = await this.jwtService.verifyAsync(token.refreshToken)
  //   if (!result) throw new UnauthorizedException('Invalid refresh token')

  //   const user = await this.userModel.findOne({ id: result.id })
  //   const tokens = await this.issueTokens(user.id)

  //   return { user: user, ...tokens }
  // }

  async getMe(token: RefreshTokenDto) {
    if (!token.refreshToken) throw new UnauthorizedException('Not authorized')

    const result = await this.jwtService.verifyAsync(token.refreshToken)

    if (!result) throw new UnauthorizedException('Invalid refresh token')

    const user = await this.userModel
      .findOne({ id: result.id })
      .populate('subscribers', 'id fullName avatarUrl')
      .populate('subscriptionsUser', 'id fullName avatarUrl')
      .populate('subscriptionsGroup', 'id title avatarUrl')

    const tokens = await this.issueTokens(user.id)

    return { user: user, ...tokens }
  }
}
