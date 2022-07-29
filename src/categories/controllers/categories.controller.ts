import { Category } from '@category/category.entity';
import { CategoriesService } from '@categories/services/categories.service';
import { Controller, Get } from '@nestjs/common';

@Controller('/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }
}
