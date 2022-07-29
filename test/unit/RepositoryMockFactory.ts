import { Repository } from 'typeorm';
import { MockType } from './types/MockType';

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findAll: jest.fn((entity) => entity),
    // ...
  }),
);
