import { Product } from '@class_products/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsFilter } from '@products/models/dtos/products.filter';
import { ProductsRepository } from '@products/repositories/products.repository';
import { DeleteResult } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: ProductsRepository,
  ) {}

  findAll(productsFilter: ProductsFilter): Promise<Product[]> {
    return this.productsRepository.findAll(productsFilter);
  }

  delete(productId: number): Promise<DeleteResult> {
    return this.productsRepository.delete({ id: productId });
  }

  create(product: Product): Promise<Product> {
    return this.productsRepository.save(product);
  }

  findById(productId: number): Promise<Product> {
    return this.productsRepository.findOne({
      where: { id: productId },
      relations: ['categoryProducts', 'categoryProducts.category'],
    });
  }
}
