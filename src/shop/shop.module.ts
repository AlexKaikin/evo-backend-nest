import { Module } from '@nestjs/common'
import { OrdersModule } from './orders/orders.module'
import { ProductsModule } from './products/products.module'
import { ReviewsModule } from './reviews/reviews.module'

@Module({
  imports: [ProductsModule, ReviewsModule, OrdersModule],
})
export class ShopModule {}
