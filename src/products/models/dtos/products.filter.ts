import { Transform } from 'class-transformer';
import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';
import { Product } from '../classes/product.entity';

export class ProductsFilter {
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => Number(value))
  size?: number = 30;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => Number(value))
  page?: number = 1;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Transform(({ value }) =>
    value
      .trim()
      .split(',')
      .map((id) => Number(id)),
  )
  categories?: number[];

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Transform(({ value }) =>
    (value as string)
      .trim()
      .split(',')
      .reduce((obj, str) => {
        const pair = str.split(' ');

        if (pair[0] === '') return obj;
        return { ...obj, [pair[0]]: pair[1] || 'ASC' };
      }, {}),
  )
  order?: { [key: string]: string };
}
