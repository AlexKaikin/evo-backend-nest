import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Product, ProductDocument } from './products.schema'

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>
  ) {}

  async getAll(
    query: any
  ): Promise<{ products: Product[]; totalCount: number }> {
    const q = query.q ? query.q : null

    const category = query.category ? query.category : null

    const priceFrom = query.price_gte ? query.price_gte : 1
    const priceTo = query.price_lte ? query.price_lte : 10000000

    const _sort = query._sort ? query._sort : null
    const _order = query._order ? query._order : null
    const _limit = query._limit ? parseInt(query._limit) : 8
    const _page = query._page ? parseInt(query._page) : 1

    function getFindParams() {
      const filter: any = {}
      filter.published = true
      filter.quantity = { $gte: 1 }
      filter.price = { $gte: priceFrom, $lte: priceTo }

      if (q) filter.title = new RegExp(q, 'i')
      if (category) filter.category = category

      return filter
    }

    const totalCount: number = (await this.productModel.find(getFindParams()))
      .length
    const products = await this.productModel
      .find(getFindParams())
      .sort({ [_sort]: _order === 'desc' ? -1 : 1 })
      .limit(_limit)
      .skip(_limit * (_page - 1))
      .populate('user')
      .exec()

    return { products, totalCount }
  }

  async getById(id: string): Promise<Product> {
    const product = await this.productModel.findOneAndUpdate(
      { id: id },
      { $inc: { viewsCount: 1 } },
      { returnDocument: 'after' }
    )

    return product
  }
}
