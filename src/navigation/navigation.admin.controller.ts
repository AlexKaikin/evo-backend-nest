import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common'
import { Auth } from 'src/account/auth/decorators/auth.decorator'
import { CreateNavigationDto } from './dto/create-navigation.dto'
import { UpdateNavigationDto } from './dto/update-navigation.dto'
import { AdminNavigationService } from './navigation.admin.service'
import { Navigation } from './navigation.schema'

@Controller('api/admin/navigation')
export class AdminNavigationController {
  constructor(private readonly navigationService: AdminNavigationService) {}

  @Post()
  @Auth('admin')
  create(
    @Body() createNavigationDto: CreateNavigationDto
  ): Promise<Navigation> {
    return this.navigationService.create(createNavigationDto)
  }

  @Get()
  @Auth('admin')
  find(): Promise<Navigation> {
    return this.navigationService.find()
  }

  @Patch()
  @Auth('admin')
  update(@Body() updateNavigation: UpdateNavigationDto): Promise<Navigation> {
    return this.navigationService.update(updateNavigation)
  }

  @Delete()
  @Auth('admin')
  remove(): Promise<Navigation> {
    return this.navigationService.remove()
  }
}
