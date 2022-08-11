import { Category } from '@categories/models/classes/category.entity';
import { CategoryProducts } from '@category_products/models/classes/category_products.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '@class_products/product.entity';
import { ProductsService } from '@products/services/products.service';

describe('Products Service', () => {
  let service: ProductsService;
  let find: jest.Mock;
  let del: jest.Mock;
  let save: jest.Mock;
  let findOne: jest.Mock;
  let findAll: jest.Mock;

  beforeEach(async () => {
    find = jest.fn();
    del = jest.fn();
    save = jest.fn();
    findOne = jest.fn();
    findAll = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            find,
            delete: del,
            save,
            findOne,
            findAll,
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
  });

  describe('Find by id', () => {
    it('Returns the product that matches id', async () => {
      const product = new Product();
      product.id = 1;
      product.name = 'Mi Producto';
      product.description = 'Heyyy';
      product.price = 50;
      product.rating = 5;
      product.status = 10;
      product.stock = 35;
      const catProd = new CategoryProducts();
      catProd.category = new Category();
      catProd.product = product;
      product.categoryProducts = [catProd];
      findOne.mockImplementation(async () => product);
      const res = await service.findById(1);
      expect(res.id).toBe(product.id);
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

  describe('Create', () => {
    it('Should return the product that was saved in the repository', async () => {
      const product = new Product();

      product.name = 'Mi Producto';
      product.description = 'Heyyy';
      product.price = 50;
      product.rating = 5;
      product.status = 10;
      product.stock = 35;
      const catProd = new CategoryProducts();
      catProd.category = new Category();
      catProd.product = product;
      product.categoryProducts = [catProd];
      save.mockImplementation(async (prod: Product) => {
        prod.id = 1;
        return prod;
      });
      const res = await service.create(product);
      expect(res.id).toBe(1);
    });
  });

  describe('Update', () => {
    it('Should update the product based on its id', async () => {
      const product = new Product();
      const id = 3;
      product.name = 'Mi Producto';
      product.description = 'Heyyy';
      product.price = 50;
      product.rating = 5;
      product.status = 10;
      product.stock = 35;
      const catProd = new CategoryProducts();
      catProd.category = new Category();
      catProd.product = product;
      product.categoryProducts = [catProd];
      save.mockImplementation(async (prod: Product) => {
        return prod;
      });
      const res = await service.update(id, product);
      expect(save).toHaveBeenCalledTimes(1);
      expect(res.id).toBe(id);
    });
  });
});
