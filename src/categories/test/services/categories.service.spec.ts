import { Category } from '@category/category.entity';
import { CategoriesService } from '@categories/services/categories.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Categories Service', () => {
  let service: CategoriesService;
  let find: jest.Mock;

  beforeEach(async () => {
    find = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useValue: {
            find,
          },
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('CategoriesService - should be defined', () => {
    expect(service).toBeDefined();
  });

  it('CategoriesService - should return what repository returns', async () => {
    const cat = new Category();
    cat.name = 'Motos';
    find.mockReturnValueOnce(Promise.resolve([cat]));
    const [theCat] = await service.findAll();
    expect(theCat.name).toBe(cat.name);
  });
});
