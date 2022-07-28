import { BaseEntity } from '@base/mc/BaseEntity.entity';
import { CategoryProducts } from '@category_products/mc/category_products.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'categories' })
export class Category extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'parent_category_id' })
  parentCategory: Category;

  @OneToMany(
    () => CategoryProducts,
    (categoryProducts) => categoryProducts.category,
  )
  categoryProducts: CategoryProducts[];
}
