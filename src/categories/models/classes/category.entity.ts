import { BaseEntity } from '@class_base/BaseEntity.entity';
import { CategoryProducts } from '@class_category_products/category_products.entity';
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
