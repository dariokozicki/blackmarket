import { Product } from '@products/models/classes/product.entity';
import { ProductsFilter } from '@products/models/dtos/products.filter';
import { ILike, In, Repository } from 'typeorm';

export class ProductsRepository extends Repository<Product> {
  findAll(
    {
      size,
      page,
      categories,
      search,
      order,
    }: ProductsFilter = new ProductsFilter(),
  ): Promise<Product[]> {
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

    return this.find({
      take: size,
      skip: (page - 1) * size,
      where: whereSearch,
      order,
    });
  }
}
