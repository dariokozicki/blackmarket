import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '@products/models/classes/product.entity';
import { ProductsFilter } from '@products/models/dtos/products.filter';
import { In, Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  findAll({ size, page, categories }: ProductsFilter): Promise<Product[]> {
    return this.productsRepository.find({
      take: size,
      skip: (page - 1) * size,
      ...(categories && {
        where: {
          categoryProducts: {
            category: {
              id: In(categories),
            },
          },
        },
      }),
    });
  }
}
