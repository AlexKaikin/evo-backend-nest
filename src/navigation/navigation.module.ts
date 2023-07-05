import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AdminNavigationController } from './navigation.admin.controller'
import { AdminNavigationService } from './navigation.admin.service'
import { NavigationController } from './navigation.controller'
import { Navigation, NavigationSchema } from './navigation.schema'
import { NavigationService } from './navigation.service'

@Module({
  controllers: [NavigationController, AdminNavigationController],
  providers: [NavigationService, AdminNavigationService],
  imports: [
    MongooseModule.forFeature([
      { name: Navigation.name, schema: NavigationSchema },
    ]),
  ],
})
export class NavigationModule {}
