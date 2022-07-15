import { Category } from '@categories/models/classes/category.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  findAll(): Promise<Category[]> {
    return this.categoriesRepository.find({
      take: 20,
      loadRelationIds: {
        relations: ['parentCategory'],
      },
    });
  }
}
