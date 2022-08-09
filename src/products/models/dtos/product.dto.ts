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
}
