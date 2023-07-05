import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { Auth } from './decorators/auth.decorator'
import { CurrentUser } from './decorators/user.decorator'
import { CreateUserDto } from './dto/create-user.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  register(@Body() user: CreateUserDto) {
    return this.authService.register(user)
  }

  @Post('access-token')
  getNewToken(@Body() token: RefreshTokenDto) {
    return this.authService.getNewToken(token)
  }

  @Post('login')
  login(@Body() user: CreateUserDto) {
    return this.authService.login(user)
  }

  @Auth()
  @Get('getMyProfile')
  getMyProfile(@CurrentUser('id') userId: number) {
    return this.authService.getMyProfile(userId)
  }
}
