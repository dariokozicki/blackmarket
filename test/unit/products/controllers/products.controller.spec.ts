import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '@products/controllers/products.controller';
import { ProductsService } from '@products/services/products.service';
import { DeleteResult } from 'typeorm';
import { HttpException } from '@nestjs/common';
import { Product } from '@class_products/product.entity';

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
            delete: jest.fn(() => {}),
          }),
        },
      ],
    }).compile();

    productsController = moduleRef.get<ProductsController>(ProductsController);
    productsService = moduleRef.get<ProductsService>(ProductsService);
  });

  describe('GET /products', () => {
    it('Should return list of products when no filter is made', async () => {
      const products: Product[] = [];
      jest
        .spyOn(productsService, 'findAll')
        .mockImplementation(async () => products);
      expect(await productsController.findAll({ page: 1, size: 30 })).toBe(
        products,
      );
    });
  });

  describe('DELETE /products', () => {
    it('Should return 404 when no product is deleted', async () => {
      const prodId = 1;
      const res: DeleteResult = {
        affected: 0,
        raw: {},
      };
      jest.spyOn(productsService, 'delete').mockImplementation(async () => res);

      expect(
        async () => await productsController.delete(prodId),
      ).rejects.toThrow(HttpException);
    });

    it('Should return 200 when product is deleted', async () => {
      const prodId = 1;
      const res: DeleteResult = {
        affected: 1,
        raw: {},
      };
      jest.spyOn(productsService, 'delete').mockImplementation(async () => res);

      productsController.delete(prodId);
      expect(productsService.delete).toHaveBeenCalled();
    });
  });
});
