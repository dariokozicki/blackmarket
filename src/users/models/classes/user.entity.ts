import { BaseEntity } from '@base/models/classes/BaseEntity.entity';
import { Role } from 'src/roles/models/enums/role.enum';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  roles: Role[];
}
