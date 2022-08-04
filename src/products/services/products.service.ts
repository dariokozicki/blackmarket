import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '@class_products/product.entity';
import { ProductRepository } from '@products/repositories/product.repository';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: ProductRepository,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.findAll();
  }
}
