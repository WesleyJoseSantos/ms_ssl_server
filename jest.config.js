/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  roots: ['<rootDir>/src'],
  globals: {},
  collectCoverageFrom: [
    '<rootDir/src/**/*.ts',
    '!<rootDir>/src/app.module.ts',
    '!<rootDir>/src/main.ts',
    '!<rootDir>/src/business/dtos/*.ts',
    '!<rootDir>/src/business/entities/*.ts',
    '!<rootDir>/src/business/errors/*.ts',
    '!<rootDir>/src/mocks/*.ts',
    '!<rootDir>/src/application/errors/*.ts',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  setupFiles: ['<rootDir>/jest.setup.js'],
  preset: 'ts-jest',
  moduleNameMapper: {
    '@application/(.*)': '<rootDir>/src/application/$1',
    '@business/(.*)': '<rootDir>/src/business/$1',
    '@infrastructure/(.*)': '<rootDir>/src/infrastructure/$1',
    '@controllers/(.*)': '<rootDir>/src/controllers/$1',
    '@shared/(.*)': '<rootDir>/src/shared/$1'
  }
};