import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Product } from '@class_products/product.entity';
import { ProductDTO } from '@products/models/dtos/product.dto';
import { ProductsFilter } from '@products/models/dtos/products.filter';
import { ProductsService } from '@products/services/products.service';

@Controller('/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(@Query() filter: ProductsFilter): Promise<Product[]> {
    return this.productsService.findAll(filter);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) productId: number) {
    const product = await this.productsService.findById(productId);

    if (!product)
      throw new HttpException(`Product ID ${productId} was not found`, 404);

    return product;
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) productId: number) {
    const { affected } = await this.productsService.delete(productId);

    if (!affected)
      throw new HttpException(`Product ID ${productId} was not found`, 404);
  }

  @Post()
  create(@Body() productDTO: ProductDTO) {
    return this.productsService.create(new Product(productDTO));
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() productDTO: ProductDTO,
  ) {
    return this.productsService.update(id, new Product(productDTO));
  }
}
