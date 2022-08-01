import { BaseEntity } from '@base/models/classes/BaseEntity.entity';
import { Category } from '@category/category.entity';
import { Product } from '@product/product.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('category_products')
export class CategoryProducts extends BaseEntity {
  @ManyToOne(() => Category, (category) => category.categoryProducts, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Product, (product) => product.categoryProducts, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
