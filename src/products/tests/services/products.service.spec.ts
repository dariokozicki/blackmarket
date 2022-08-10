import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '@class_products/product.entity';
import { ProductsService } from '@products/services/products.service';

describe('Products Service', () => {
  let service: ProductsService;
  let find: jest.Mock;
  let findAll: jest.Mock;
  beforeEach(async () => {
    find = jest.fn();
    findAll = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            find,
            findAll,
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
    findAll.mockReturnValueOnce(Promise.resolve([prod]));
    const [theProd] = await service.findAll();
    expect(theProd.name).toBe(prod.name);
  });
});
