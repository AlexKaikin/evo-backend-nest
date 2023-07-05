import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common'
import { Response } from 'express'
import { Auth } from 'src/account/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/account/auth/decorators/user.decorator'
import { User } from 'src/account/users/users.schema'
import { CreateOrderDto } from './dto/create-order.dto'
import { Order } from './orders.schema'
import { OrdersService } from './orders.service'

@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @Auth()
  create(@Body() order: CreateOrderDto, @CurrentUser() currentUser: User) {
    return this.ordersService.create(order, currentUser)
  }

  @Get()
  @Auth()
  async findAllForAccount(
    @CurrentUser() currentUser: User,
    @Query() query: any,
    @Res() res: Response
  ): Promise<Response> {
    const { orders, totalCount }: any =
      await this.ordersService.findAllForAccount(query, currentUser)

    return res.set({ 'X-Total-Count': totalCount }).json(orders)
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string): Promise<Order> {
    return this.ordersService.findOne(+id)
  }
}
