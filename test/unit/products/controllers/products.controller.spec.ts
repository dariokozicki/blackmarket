import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '@products/controllers/products.controller';
import { ProductsService } from '@products/services/products.service';
import { DeleteResult } from 'typeorm';
import { HttpException } from '@nestjs/common';
import { Product } from '@class_products/product.entity';
import { ProductDTO } from '@products/models/dtos/product.dto';

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
            findById: jest.fn(() => {}),
            create: jest.fn(() => {}),
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

    it('Should return individual product when id is given', async () => {
      const product = new Product();
      const id = 3;
      product.name = 'Chair';
      product.id = id;
      jest
        .spyOn(productsService, 'findById')
        .mockImplementation(async () => product);
      expect(await productsController.findById(id)).toBe(product);
    });

    it('Should return 404 when no product is found', async () => {
      const prodId = 1;
      const res = null;
      jest.spyOn(productsService, 'delete').mockImplementation(async () => res);

      expect(
        async () => await productsController.findById(prodId),
      ).rejects.toThrow(HttpException);
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

  describe('CREATE /products', () => {
    it('Should create a product when given the correct body', async () => {
      const product = new ProductDTO();

      product.name = 'Mi Producto';
      product.description = 'Heyyy';
      product.price = 50;
      product.rating = 5;
      product.status = 10;
      product.stock = 35;
      product.categories = [123, 456];
      jest
        .spyOn(productsService, 'create')
        .mockImplementation(async () => new Product(product));
      const res = await productsController.create(product);
      expect(res.name).toBe(product.name);
    });
  });
});
