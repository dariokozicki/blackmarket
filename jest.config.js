const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  coverageThreshold: {
    global: {
      lines: 90,
    },
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.(t|j)s',
    '!**/main.ts',
    '!**/*.module.ts',
    '!**/*.entity.ts',
    '!**/*.guard.ts',
    '!**/*.decorator.ts',
    '!**/*.filter.ts',
  ],
  coverageDirectory: './test/coverage',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
};
