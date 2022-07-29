import { Category } from '@categories/models/classes/category.entity';
import { CategoryProducts } from '@category_products/models/classes/category_products.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '@products/models/classes/product.entity';
import { ProductsService } from '@products/services/products.service';

describe('Products Service', () => {
  let service: ProductsService;
  let find: jest.Mock;
  let del: jest.Mock;

  beforeEach(async () => {
    find = jest.fn();
    del = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            find,
            delete: del,
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('FindAll', () => {
    it('Should return array of products if data sent is correct', async () => {
      const prod = new Product();
      prod.name = 'Lapicera';
      const categoryId = 3;
      const categoryProducts = new CategoryProducts();
      categoryProducts.category = new Category();
      categoryProducts.category.id = categoryId;
      prod.categoryProducts = [new CategoryProducts()];
      find.mockReturnValueOnce(Promise.resolve([prod]));
      const [theProd] = await service.findAll({
        page: 1,
        size: 30,
        categories: [categoryId],
        search: 'Lapi',
      });
      expect(theProd.name).toBe(prod.name);

      find.mockReturnValueOnce(Promise.resolve([prod]));
      const [secondProd] = await service.findAll({
        page: 1,
        size: 30,
        categories: [categoryId],
      });
      expect(secondProd.name).toBe(prod.name);
    });
  });

  describe('Delete', () => {
    it('Should call repository.delete with productId', async () => {
      const prodId = 1;
      const aff = 1;
      del.mockReturnValueOnce({ affected: aff, raw: {} });
      const { affected } = await service.delete(1);
      expect(affected).toBe(aff);
      expect(del).toHaveBeenCalledWith({ id: prodId });
    });
  });
});
