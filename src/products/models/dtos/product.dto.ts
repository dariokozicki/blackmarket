import { CategoryProducts } from '@category_products/mc/category_products.entity';
import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';
import { Product } from '../classes/product.entity';

export class ProductDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsInt()
  price: number;

  @IsInt()
  rating: number;

  @IsInt()
  status: number;

  @IsInt()
  stock: number;

  @IsArray()
  @IsOptional()
  categories: number[];

  toProduct(): Product {
    const product = new Product();
    product.name = this.name;
    product.description = this.description;
    product.price = this.price;
    product.rating = this.rating;
    product.status = this.status;
    product.stock = this.stock;
    product.categoryProducts = this.categories?.map((catId) => {
      const catprods = new CategoryProducts();
      catprods.category = catId as any;
      return catprods;
    });
    return product;
  }
}
