import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsInt, IsOptional } from 'class-validator';

export class ProductsFilter {
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
  @IsInt()
  @Transform(({ value }) => Number(value))
  size?: number = 30;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => Number(value))
  page?: number = 1;
}
