import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AdminOrdersController } from './orders.admin.controller'
import { AdminOrdersService } from './orders.admin.service'
import { OrdersController } from './orders.controller'
import { Order, OrderSchema } from './orders.schema'
import { OrdersService } from './orders.service'

@Module({
  controllers: [OrdersController, AdminOrdersController],
  providers: [OrdersService, AdminOrdersService],
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
})
export class OrdersModule {}
