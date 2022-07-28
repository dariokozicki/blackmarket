import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryProducts } from './models/classes/category_products.entity';

@Module({ imports: [TypeOrmModule.forFeature([CategoryProducts])] })
export class CategoryProductsModule {}
