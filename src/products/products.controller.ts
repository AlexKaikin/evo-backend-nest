import { Controller, Param, Body } from '@nestjs/common'
import { Get, Post, Put, Delete } from '@nestjs/common/decorators'
import { CreateProductDto } from './products.dto'

@Controller('api/products')
export class ProductsController {
  @Get()
  getAll(): string {
    return 'getAll'
  }

  @Get(':id')
  getOne(@Param('id') id: string): string {
    return id
  }

  @Post()
  create(@Body() CreateProduct: CreateProductDto) {
    return CreateProduct
  }

  @Put(':id')
  update(@Param('id') id: string): string {
    return id
  }

  @Delete(':id')
  delete(@Param('id') id: string): string {
    return id
  }
}
