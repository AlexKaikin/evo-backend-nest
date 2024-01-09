import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from 'src/account/users/users.schema'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { Product, ProductDocument } from './products.schema'

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

    const priceFrom = query.price_gte ? query.price_gte : null
    const priceTo = query.price_lte ? query.price_lte : null

    const ratings = query.ratings ? query.ratings.split(',') : null

    const manufacturer = query.manufacturer ? query.manufacturer : null

    const _sort = query._sort ? query._sort : 'id'
    const _order = query._order ? query._order : 'desc'
    const _limit = query._limit ? parseInt(query._limit) : 10
    const _page = query._page ? parseInt(query._page) : 1

    function getFindParams() {
      const filter: any = {}
      filter.published = true
      filter.inStock = { $gte: 1 }

      if (q) filter.title = new RegExp(q, 'i')
      if (category) filter.category = category
      if (ratings) filter.rating = { $in: ratings }
      if (manufacturer) filter.manufacturer = new RegExp(manufacturer, 'i')
      if (priceFrom)
        filter.price
          ? (filter.price.$gte = priceFrom)
          : (filter.price = { $gte: priceFrom })
      if (priceTo)
        filter.price
          ? (filter.price.$lte = priceTo)
          : (filter.price = { $lte: priceTo })

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

    if (!product) throw new NotFoundException('Product not found')

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

  async update(
    id: number,
    product: UpdateProductDto,
    user: User
  ): Promise<Product> {
    product.updated = new Date().getTime()
    product.user = user._id

    const updateProduct = await this.productModel.findOneAndUpdate(
      { id },
      product,
      { new: true }
    )

    return updateProduct
  }

  async remove(id: string) {
    return this.productModel.findOneAndDelete({ id })
  }
}
