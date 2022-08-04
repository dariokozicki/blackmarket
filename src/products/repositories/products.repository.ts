import { Product } from '@products/models/classes/product.entity';
import { Repository } from 'typeorm';

export class ProductsRepository extends Repository<Product> {
  findAll() {
    return this.find({ take: 20 });
  }
}