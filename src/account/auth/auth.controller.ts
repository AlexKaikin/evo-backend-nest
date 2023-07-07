import {
  Body,
  Controller,
  //Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { AuthService } from './auth.service'
// import { Auth } from './decorators/auth.decorator'
// import { CurrentUser } from './decorators/user.decorator'
// import { CreateUserDto } from './dto/create-user.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  register(@Body() user: any) {
    return this.authService.register(user)
  }

  // @Post('access-token')
  // getNewToken(@Body() token: RefreshTokenDto) {
  //   return this.authService.getNewToken(token)
  // }

  @Post('login')
  login(@Body() user: any) {
    return this.authService.login(user)
  }

  @Post('me')
  getMe(@Body() token: RefreshTokenDto) {
    return this.authService.getMe(token)
  }
}
