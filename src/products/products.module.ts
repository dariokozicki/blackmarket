import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { Product } from './models/classes/product.entity';
import {
  getDataSourceToken,
  getRepositoryToken,
  TypeOrmModule,
} from '@nestjs/typeorm';
import { ProductsRepository } from './repositories/products.repository';
import { DataSource, Repository } from 'typeorm';
/* istanbul ignore file */
@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [
    {
      provide: getRepositoryToken(Product),
      inject: [getDataSourceToken()],
      useFactory(dataSource: DataSource) {
        // Override default repository for Product with a custom one
        return new ProductsRepository(
          Product,
          dataSource.createEntityManager(),
          dataSource.createQueryRunner(),
        );
      },
    },
    ProductsService,
  ],
})
export class ProductsModule {}
