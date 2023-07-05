import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from 'src/account/users/users.schema'
import { CreateOrderDto } from './dto/create-order.dto'
import { Order, OrderDocument } from './orders.schema'

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>
  ) {}

  create(order: CreateOrderDto, user: User) {
    order.id = +new Date().getTime()
    order.created = new Date().getTime()
    order.user = user._id

    const newOrder = new this.orderModel(order)
    newOrder.save()

    return newOrder
  }

  async findAllForAccount(
    query: any,
    currentUser: User
  ): Promise<{ reviews: Order[]; totalCount: number }> {
    const _limit = query._limit ? parseInt(query._limit) : 8
    const _page = query._page ? parseInt(query._page) : 1

    const totalCount: number = (
      await this.orderModel.find({ user: currentUser })
    ).length

    const reviews = await this.orderModel
      .find({ user: currentUser })
      .limit(_limit)
      .skip(_limit * (_page - 1))
      .populate('user')
      .exec()

    return { reviews, totalCount }
  }

  async findOne(id: number) {
    const order = await this.orderModel.findOne({ id })

    if (!order) throw new NotFoundException('Order not found')

    return order
  }
}
