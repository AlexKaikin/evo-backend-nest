import { Body, Controller, Param } from '@nestjs/common'
import { Delete, Get, Patch, Post, Query, Res } from '@nestjs/common/decorators'
import { Response } from 'express'
import { Auth } from 'src/account/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/account/auth/decorators/user.decorator'
import { User } from 'src/account/users/users.schema'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { AdminProductsService } from './products.admin.service'
import { Product } from './products.schema'

@Controller('api/admin/products')
export class AdminProductsController {
  constructor(private readonly adminProductsService: AdminProductsService) {}

  @Get()
  @Auth('admin')
  async getAll(@Query() query: any, @Res() res: Response): Promise<Response> {
    const { products, totalCount }: any =
      await this.adminProductsService.getAll(query)

    return res.set({ 'X-Total-Count': totalCount }).json(products)
  }

  @Get(':id')
  @Auth('admin')
  getOne(@Param('id') id: string): Promise<Product> {
    return this.adminProductsService.getById(id)
  }

  @Post()
  @Auth('admin')
  create(
    @Body() newProduct: CreateProductDto,
    @CurrentUser() user: User
  ): Promise<Product> {
    return this.adminProductsService.create(newProduct, user)
  }

  @Patch()
  @Auth('admin')
  update(
    @Body() updateProduct: UpdateProductDto,
    @CurrentUser() user: User
  ): Promise<Product> {
    return this.adminProductsService.update(updateProduct, user)
  }

  @Delete(':id')
  @Auth('admin')
  remove(@Param('id') id: string): Promise<Product> {
    return this.adminProductsService.remove(id)
  }
}
