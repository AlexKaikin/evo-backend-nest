import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { Product, ProductDocument } from './products.schema'
import { User } from 'src/users/users.schema'

@Injectable()
export class AdminProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>
  ) {}

  async getAll(
    query: any
  ): Promise<{ products: Product[]; totalCount: number }> {
    const q = query.q ? query.q : null

    const category = query.category ? query.category : null

    const priceFrom = query.price_gte ? query.price_gte : 0
    const priceTo = query.price_lte ? query.price_lte : 10000000

    const _sort = query._sort ? query._sort : null
    const _order = query._order ? query._order : null
    const _limit = query._limit ? parseInt(query._limit) : 8
    const _page = query._page ? parseInt(query._page) : 1

    function getFindParams() {
      const filter: any = {}
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
    const product = await this.productModel.findOne({ id })

    return product
  }

  async create(product: CreateProductDto, user: User): Promise<Product> {
    product.id = new Date().getTime()
    product.created = new Date().getTime()
    product.updated = new Date().getTime()
    product.user = user._id

    const newProduct = new this.productModel(product)
    newProduct.save()

    return newProduct
  }

  async update(product: UpdateProductDto, user: User): Promise<Product> {
    product.updated = new Date().getTime()
    product.user = user._id

    const updateProduct = await this.productModel.findOneAndUpdate(
      { id: product.id },
      product,
      { new: true }
    )

    return updateProduct
  }

  async remove(id: string) {
    return this.productModel.findOneAndDelete({ id })
  }
}
