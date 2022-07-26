import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '@products/models/classes/product.entity';
import { ProductsFilter } from '@products/models/dtos/products.filter';
import { DeleteResult, ILike, In, Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  findAll({
    size,
    page,
    categories,
    search,
    order,
  }: ProductsFilter): Promise<Product[]> {
    const categoriesSearch = categories && {
      categoryProducts: {
        category: {
          id: In(categories),
        },
      },
    };
    const whereSearch = search
      ? ['name', 'description'].map((key) => ({
          [key]: ILike(`%${search}%`),
          ...categoriesSearch,
        }))
      : { ...categoriesSearch };

    return this.productsRepository.find({
      take: size,
      skip: (page - 1) * size,
      where: whereSearch,
      order,
    });
  }

  delete(productId: number): Promise<DeleteResult> {
    return this.productsRepository.delete({ id: productId });
  }
}
