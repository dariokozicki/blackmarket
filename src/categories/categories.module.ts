import { Module } from '@nestjs/common';
import {
  getDataSourceToken,
  getRepositoryToken,
  TypeOrmModule,
} from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CategoriesController } from './controllers/categories.controller';
import { Category } from './models/classes/category.entity';
import { CategoriesRepository } from './repositories/categories.repository';
import { CategoriesService } from './services/categories.service';
/* istanbul ignore file */
@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [
    {
      provide: getRepositoryToken(Category),
      inject: [getDataSourceToken()],
      useFactory(dataSource: DataSource) {
        // Override default repository for Product with a custom one
        return new CategoriesRepository(
          Category,
          dataSource.createEntityManager(),
          dataSource.createQueryRunner(),
        );
      },
    },
    CategoriesService,
  ],
})
export class CategoriesModule {}
