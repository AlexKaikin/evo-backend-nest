import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UpdateOrderDto } from './dto/update-order.dto'
import { Order, OrderDocument } from './orders.schema'

@Injectable()
export class AdminOrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>
  ) {}

  async findAllForAdmin(
    query: any
  ): Promise<{ orders: Order[]; totalCount: number }> {
    const _limit = query._limit ? parseInt(query._limit) : 8
    const _page = query._page ? parseInt(query._page) : 1

    const totalCount: number = (await this.orderModel.find()).length

    const orders = await this.orderModel
      .find()
      .limit(_limit)
      .skip(_limit * (_page - 1))
      .populate('user')
      .exec()

    return { orders, totalCount }
  }

  async findOne(id: number) {
    const order = await this.orderModel.findOne({ id })

    if (!order) throw new NotFoundException('Order not found')

    return order
  }

  async update(id: number, order: UpdateOrderDto) {
    order.updated = new Date().getTime()

    const updatedReview = await this.orderModel.findOneAndUpdate(
      { id },
      { ...order }
    )

    return updatedReview
  }

  async remove(id: number) {
    const order = await this.orderModel.findOneAndDelete({ id })

    return order
  }
}
