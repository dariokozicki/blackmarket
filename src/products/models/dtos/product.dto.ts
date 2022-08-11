import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

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
