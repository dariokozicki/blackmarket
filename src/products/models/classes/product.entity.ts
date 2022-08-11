import { BaseEntity } from '@class_base/BaseEntity.entity';
import { CategoryProducts } from '@class_category_products/category_products.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ProductDTO } from '../dtos/product.dto';

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

  constructor();

  constructor(productDTO: ProductDTO);

  constructor(...args: any[]) {
    if (args.length === 1) {
      if (args[0] instanceof ProductDTO) {
        super();
        const dto = args[0] as ProductDTO;
        this.name = dto.name;
        this.description = dto.description;
        this.price = dto.price;
        this.rating = dto.rating;
        this.status = dto.status;
        this.stock = dto.stock;
        this.categoryProducts = dto.categories?.map((catId) => {
          const catprods = new CategoryProducts();
          catprods.category = catId as any;
          return catprods;
        });
      }
    } else {
      super();
    }
  }
}
