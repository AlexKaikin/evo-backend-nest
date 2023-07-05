import { Controller, Param } from '@nestjs/common'
import { Get, Query, Res } from '@nestjs/common/decorators'
import { Response } from 'express'
import { Product } from './products.schema'
import { ProductsService } from './products.service'

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(@Query() query: any, @Res() res: Response): Promise<Response> {
    const { products, totalCount }: any = await this.productsService.findAll(
      query
    )

    return res.set({ 'X-Total-Count': totalCount }).json(products)
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(id)
  }
}
