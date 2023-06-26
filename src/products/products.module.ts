import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ProductsController } from './products.controller'
import { Product, ProductSchema } from './products.schema'
import { ProductsService } from './products.service'
import { AdminProductsController } from './adminProducts.controller'
import { AdminProductsService } from './adminProducts.service'

@Module({
  providers: [ProductsService, AdminProductsService],
  controllers: [ProductsController, AdminProductsController],
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
})
export class ProductsModule {}
