import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ProductSchema } from 'src/shop/products/products.schema'
import { Product } from './entities/product.entity'
import { AdminProductsController } from './products.admin.controller'
import { AdminProductsService } from './products.admin.service'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'

@Module({
  providers: [ProductsService, AdminProductsService],
  controllers: [ProductsController, AdminProductsController],
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
})
export class ProductsModule {}
