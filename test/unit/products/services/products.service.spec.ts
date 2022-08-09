import { Category } from '@categories/models/classes/category.entity';
import { CategoryProducts } from '@category_products/models/classes/category_products.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '@class_products/product.entity';
import { ProductsService } from '@products/services/products.service';
import { DeleteResult } from 'typeorm';

describe('Products Service', () => {
  let service: ProductsService;
  let find: jest.Mock;
  let findAll: jest.Mock;
  let del: jest.Mock;
  beforeEach(async () => {
    find = jest.fn();
    findAll = jest.fn();
    del = jest.fn(({ id }) => {
      const res = new DeleteResult();
      res.affected = 1;
      return res;
    });
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            find,
            findAll,
            delete: del,
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('ProductsService - should be defined', () => {
    expect(service).toBeDefined();
  });

  it('ProductsService - should return what repository returns', async () => {
    const prod = new Product();
    prod.name = 'Lapicera';
    const categoryId = 3;
    const categoryProducts = new CategoryProducts();
    categoryProducts.category = new Category();
    categoryProducts.category.id = categoryId;
    prod.categoryProducts = [new CategoryProducts()];
    findAll.mockReturnValueOnce(Promise.resolve([prod]));
    const [theProd] = await service.findAll({
      page: 1,
      size: 30,
      categories: [categoryId],
      search: 'Lapi',
    });
    expect(theProd.name).toBe(prod.name);

    findAll.mockReturnValueOnce(Promise.resolve([prod]));
    const [secondProd] = await service.findAll({
      page: 1,
      size: 30,
      categories: [categoryId],
    });
    expect(secondProd.name).toBe(prod.name);
  });

  it('ProductsService - Should call repository with given id when deleting', async () => {
    const productId = 3;
    const res = await service.delete(productId);
    expect(res.affected).toBe(1);
  });
});
