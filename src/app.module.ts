import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatabaseModule } from './database/database.module'
import { ProductsController } from './products/products.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, ProductsController],
  providers: [AppService],
})
export class AppModule {}
