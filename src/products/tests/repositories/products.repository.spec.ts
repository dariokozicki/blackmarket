import { Product } from '@products/models/classes/product.entity';
import { ProductsRepository } from '@products/repositories/products.repository';

describe('Products Repository', () => {
  let repository: ProductsRepository;

  beforeEach(() => {
    repository = new ProductsRepository(Product, null);
  });

  describe('Find All', () => {
    it('Should return the categories when called', async () => {
      const prod = new Product();
      prod.id = 3;
      jest.spyOn(repository, 'find').mockImplementationOnce(async () => [prod]);
      const products = await repository.findAll();
      expect(products[0].id).toBe(prod.id);
    });
  });
});
