import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '@products/controllers/products.controller';
import { ProductsService } from '@products/services/products.service';
import { Product } from '@products/models/classes/product.entity';

describe('ProductsController', () => {
  let productsController: ProductsController;
  let productsService: ProductsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useFactory: () => ({
            findAll: jest.fn(() => []),
          }),
        },
      ],
    }).compile();

    productsController = moduleRef.get<ProductsController>(ProductsController);
    productsService = moduleRef.get<ProductsService>(ProductsService);
  });

  describe('GET /products', () => {
    it('should return what the service returns', async () => {
      const products: Product[] = [];
      jest
        .spyOn(productsService, 'findAll')
        .mockImplementation(async () => products);
      expect(await productsController.findAll({ page: 1, size: 30 })).toBe(
        products,
      );
    });
  });
});
