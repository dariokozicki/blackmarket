module.exports = {
  coverageThreshold: {
    global: {
      lines: 90,
    },
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s', '!**/main.ts', '!**/*.module.ts'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
