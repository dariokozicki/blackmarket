import { Product } from '@products/models/classes/product.entity';
import { ProductsRepository } from '@products/repositories/products.repository';

describe('Products Repository', () => {
  let repository: ProductsRepository;

  beforeEach(() => {
    repository = new ProductsRepository(Product, null);
  });

  describe('Find All', () => {
    it('Should return the categories when called with no arguments', async () => {
      const prod = new Product();
      prod.id = 3;
      jest.spyOn(repository, 'find').mockImplementationOnce(async () => [prod]);
      const products = await repository.findAll();
      expect(products[0].id).toBe(prod.id);
    });

    it('Should return the categories when called with all arguments', async () => {
      const prod = new Product();
      prod.id = 3;
      jest.spyOn(repository, 'find').mockImplementationOnce(async () => [prod]);
      const products = await repository.findAll({
        page: 1,
        size: 30,
        categories: [123, 456],
        search: 'bike',
        order: { id: 'desc' },
      });
      expect(products[0].id).toBe(prod.id);
    });

    it('Should return the categories when called with some arguments', async () => {
      const prod = new Product();
      prod.id = 3;
      jest.spyOn(repository, 'find').mockImplementationOnce(async () => [prod]);
      const products = await repository.findAll({ page: 1 });
      expect(products[0].id).toBe(prod.id);
    });
  });
});
