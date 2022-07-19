import { BaseEntity } from '@base/models/classes/BaseEntity.entity';
import { CategoryProducts } from '@category_products/models/classes/category_products.entity';
import { Column, Entity, JoinTable, OneToMany } from 'typeorm';

@Entity('products')
export class Product extends BaseEntity {
  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({ type: 'integer' })
  price: number;

  @Column({ type: 'integer' })
  rating: number;

  @Column({ type: 'integer' })
  status: number;

  @Column({ type: 'integer' })
  stock: number;

  // @ManyToMany(() => Category) ANOTHER ENTITY INSTEAD OF MANY TO MANY
  // @JoinTable({ name: 'category_products' })
  // categories: Category[];
  @OneToMany(
    () => CategoryProducts,
    (categoryProducts) => categoryProducts.product,
  )
  categoryProducts: CategoryProducts[];
}
