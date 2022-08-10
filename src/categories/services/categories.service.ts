import { CategoriesRepository } from '@categories/repositories/categories.repository';
import { Category } from '@class_categories/category.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: CategoriesRepository,
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoriesRepository.findAll();
  }
}
