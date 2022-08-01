import { BaseEntity } from '@base/mc/BaseEntity.entity';
import { CategoryProducts } from '@category_products/mc/category_products.entity';
import { Column, Entity, OneToMany } from 'typeorm';

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

  @OneToMany(
    () => CategoryProducts,
    (categoryProducts) => categoryProducts.product,
    { cascade: ['insert', 'update'] },
  )
  categoryProducts: CategoryProducts[];
}
