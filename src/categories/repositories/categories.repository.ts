import { Category } from '@categories/models/classes/category.entity';
import { Repository } from 'typeorm';

export class CategoriesRepository extends Repository<Category> {
  findAll() {
    return this.find({
      take: 20,
      loadRelationIds: {
        relations: ['parentCategory'],
      },
    });
  }
}
