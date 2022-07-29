import {
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsFilter } from '@products/models/dtos/products.filter';
import { Product } from '@product/product.entity';
import { ProductsService } from '@products/services/products.service';

@Controller('/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(@Query() filter: ProductsFilter): Promise<Product[]> {
    return this.productsService.findAll(filter);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) productId: number) {
    const { affected } = await this.productsService.delete(productId);

    if (!affected)
      throw new HttpException(`Product ID ${productId} was not found`, 404);
  }
}
