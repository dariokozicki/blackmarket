import { Category } from '@categories/models/classes/category.entity';
import { CategoriesRepository } from '@categories/repositories/categories.repository';

describe('Categories Repository', () => {
  let repository: CategoriesRepository;

  beforeEach(() => {
    repository = new CategoriesRepository(Category, null);
  });

  describe('Find All', () => {
    it('Should return the categories when called', async () => {
      const cat = new Category();
      cat.id = 3;
      jest.spyOn(repository, 'find').mockImplementationOnce(async () => [cat]);
      const categories = await repository.findAll();
      expect(categories[0].id).toBe(cat.id);
    });
  });
});
