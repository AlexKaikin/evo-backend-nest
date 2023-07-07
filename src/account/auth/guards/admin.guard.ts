import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { User } from 'src/account/users/users.schema'

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<{ user: User }>()
    const user = request.user

    if (user.role !== 'admin') throw new ForbiddenException('Admin Only')

    return true
  }
}
