import { Body, Controller, Param } from '@nestjs/common'
import { Delete, Get, Post, Patch, Query, Res } from '@nestjs/common/decorators'
import { Response } from 'express'
import { Product } from './products.schema'
import { ProductsService } from './products.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'

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

  @Patch()
  update(@Body() updateProduct: UpdateProductDto): Promise<Product> {
    return this.productsService.update(updateProduct)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Product> {
    return this.productsService.remove(id)
  }
}
