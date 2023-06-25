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
import { CreateUserDto } from './dto/create-user.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { User, UserDocument } from '../users/users.schema'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async register(user: CreateUserDto) {
    const checkUser = await this.userModel.findOne({ fullName: user.fullName })

    if (checkUser) throw new BadRequestException('User already exists')

    user.id = new Date().getTime()
    user.created = new Date().getTime()
    user.updated = new Date().getTime()
    user.passwordHash = await hash(user.passwordHash)

    const newUser = new this.userModel(user)
    const saveduser = await newUser.save()
    const tokens = await this.issueTokens(user.id)

    return { user: saveduser, ...tokens }
  }

  private async issueTokens(userId: number) {
    const data = { id: userId }
    const accessToken = this.jwtService.sign(data, { expiresIn: '1h' })
    const refreshToken = this.jwtService.sign(data, { expiresIn: '7h' })

    return { accessToken, refreshToken }
  }

  async login(user: CreateUserDto) {
    const existingUser = await this.userModel.findOne({ email: user.email })

    if (!existingUser) throw new NotFoundException('User not found')

    const passwordMatch = await verify(
      existingUser.passwordHash,
      user.passwordHash
    )

    if (!passwordMatch) throw new UnauthorizedException('Invalid password')

    const tokens = await this.issueTokens(existingUser.id)

    return { user: existingUser, ...tokens }
  }

  async getNewToken(token: RefreshTokenDto) {
    const result = await this.jwtService.verifyAsync(token.refreshToken)

    if (!result) throw new UnauthorizedException('Invalid refresh token')

    const user = await this.userModel.findOne({ id: result.id })
    const tokens = await this.issueTokens(user.id)

    return { user: user, ...tokens }
  }

  async getMyProfile(userId: number) {
    const user = await this.userModel.findOne({ id: userId })
    const tokens = await this.issueTokens(user.id)

    return { user: user, ...tokens }
  }
}
