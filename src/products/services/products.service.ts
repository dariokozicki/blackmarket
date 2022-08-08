import { Product } from '@class_products/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsFilter } from '@products/models/dtos/products.filter';
import { DeleteResult, ILike, In, Repository } from 'typeorm';
import { ProductsRepository } from '@products/repositories/products.repository';

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
}
