import { BaseEntity } from '@base/models/classes/BaseEntity';
import { Category } from '@categories/models/classes/category.entity';
import { Product } from '@products/models/classes/product.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('category_products')
export class CategoryProducts extends BaseEntity {
  @ManyToOne(() => Category, (category) => category.categoryProducts)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Product, (product) => product.categoryProducts)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
