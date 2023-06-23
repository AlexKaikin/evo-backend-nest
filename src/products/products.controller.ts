import { Body, Controller, Param } from '@nestjs/common'
import { Delete, Get, Post, Put, Query, Res } from '@nestjs/common/decorators'
import { Response } from 'express'
import { CreateProductDto, UpdateProductDto } from './products.dto'
import { Product } from './products.schema'
import { ProductsService } from './products.service'

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAll(@Query() query: any, @Res() res: Response): Promise<Response> {
    const { products, totalCount }: any = await this.productsService.getAll(
      query
    )
    return res.set({ 'X-Total-Count': totalCount }).json(products)
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.getById(id)
  }

  @Post()
  create(@Body() newProduct: CreateProductDto): Promise<Product> {
    return this.productsService.create(newProduct)
  }

  @Put()
  update(@Body() updateProduct: UpdateProductDto): Promise<Product> {
    return this.productsService.update(updateProduct)
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Product> {
    return this.productsService.delete(id)
  }
}
