import { CategoriesModule } from '@categories/categories.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Category } from '@categories/models/classes/category.entity';
import { Product } from '@products/models/classes/product.entity';
import { ProductsModule } from '@products/products.module';
import { CategoryProductsModule } from './category_products/category_products.module';
import { CategoryProducts } from './category_products/models/classes/category_products.entity';

/* istanbul ignore file */
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [Category, Product, CategoryProducts],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    CategoriesModule,
    ProductsModule,
    CategoryProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
