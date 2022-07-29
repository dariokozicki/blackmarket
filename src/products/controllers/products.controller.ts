import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsFilter } from '@products/models/dtos/products.filter';
import { Controller, Get } from '@nestjs/common';
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
}
