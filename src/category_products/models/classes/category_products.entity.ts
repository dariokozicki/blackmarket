import { BaseEntity } from '@base/models/classes/BaseEntity.entity';
import { Category } from '@class_categories/category.entity';
import { Product } from '@class_products/product.entity';
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
