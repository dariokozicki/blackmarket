import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from '@categories/controllers/categories.controller';
import { CategoriesService } from '@categories/services/categories.service';
import { Category } from '@class_categories/category.entity';

describe('CategoriesController', () => {
  let categoriesController: CategoriesController;
  let categoriesService: CategoriesService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesService,
          useFactory: () => ({
            findAll: jest.fn(() => []),
          }),
        },
      ],
    }).compile();

    categoriesController =
      moduleRef.get<CategoriesController>(CategoriesController);
    categoriesService = moduleRef.get<CategoriesService>(CategoriesService);
  });

  describe('GET /categories', () => {
    it('should return what the service returns', async () => {
      const categories: Category[] = [];
      jest
        .spyOn(categoriesService, 'findAll')
        .mockImplementation(async () => categories);
      expect(await categoriesController.findAll()).toBe(categories);
    });
  });
});
