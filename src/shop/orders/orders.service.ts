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
    user: User
  ): Promise<{ orders: Order[]; totalCount: number }> {
    const _limit = query._limit ? parseInt(query._limit) : 8
    const _page = query._page ? parseInt(query._page) : 1

    const totalCount: number = (await this.orderModel.find({ user: user._id }))
      .length

    const orders = await this.orderModel
      .find({ user: user._id })
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
}
