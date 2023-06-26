import { Body, Controller, Param } from '@nestjs/common'
import { Delete, Get, Patch, Post, Query, Res } from '@nestjs/common/decorators'
import { Response } from 'express'
import { AdminProductsService } from './adminProducts.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { Product } from './products.schema'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { User } from 'src/users/users.schema'

@Controller('api/admin/products')
export class AdminProductsController {
  constructor(private readonly adminProductsService: AdminProductsService) {}

  @Auth()
  @Get()
  async getAll(@Query() query: any, @Res() res: Response): Promise<Response> {
    const { products, totalCount }: any =
      await this.adminProductsService.getAll(query)

    return res.set({ 'X-Total-Count': totalCount }).json(products)
  }

  @Auth()
  @Get(':id')
  getOne(@Param('id') id: string): Promise<Product> {
    return this.adminProductsService.getById(id)
  }

  @Auth()
  @Post()
  create(
    @Body() newProduct: CreateProductDto,
    @CurrentUser() user: User
  ): Promise<Product> {
    return this.adminProductsService.create(newProduct, user)
  }

  @Auth()
  @Patch()
  update(
    @Body() updateProduct: UpdateProductDto,
    @CurrentUser() user: User
  ): Promise<Product> {
    return this.adminProductsService.update(updateProduct, user)
  }

  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Product> {
    return this.adminProductsService.remove(id)
  }
}
