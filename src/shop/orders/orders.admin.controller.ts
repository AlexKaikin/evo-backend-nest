import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  Res,
} from '@nestjs/common'
import { Response } from 'express'
import { Auth } from 'src/account/auth/decorators/auth.decorator'
import { UpdateOrderDto } from './dto/update-order.dto'
import { AdminOrdersService } from './orders.admin.service'
import { Order } from './orders.schema'

@Controller('api/admin/orders')
export class AdminOrdersController {
  constructor(private readonly adminOrdersService: AdminOrdersService) {}

  @Get()
  @Auth('admin')
  async findAllForAdmin(
    @Query() query: any,
    @Res() res: Response
  ): Promise<Response> {
    const { orders, totalCount }: any =
      await this.adminOrdersService.findAllForAdmin(query)

    return res.set({ 'X-Total-Count': totalCount }).json(orders)
  }

  @Get(':id')
  @Auth('admin')
  findOne(@Param('id') id: string): Promise<Order> {
    return this.adminOrdersService.findOne(+id)
  }

  @Patch(':id')
  @Auth('admin')
  update(
    @Param('id') id: string,
    @Body() order: UpdateOrderDto
  ): Promise<Order> {
    return this.adminOrdersService.update(+id, order)
  }

  @Delete(':id')
  @Auth('admin')
  remove(@Param('id') id: string): Promise<Order> {
    return this.adminOrdersService.remove(+id)
  }
}
