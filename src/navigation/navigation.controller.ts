import { Controller, Get } from '@nestjs/common'
import { NavigationService } from './navigation.service'
import { Navigation } from './navigation.schema'

@Controller('api/navigation')
export class NavigationController {
  constructor(private readonly navigationService: NavigationService) {}

  @Get()
  find(): Promise<Navigation[]> {
    return this.navigationService.find()
  }
}
