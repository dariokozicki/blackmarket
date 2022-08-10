import { Product } from '@class_products/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsRepository } from '@products/repositories/products.repository';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: ProductsRepository,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.findAll();
  }
}
