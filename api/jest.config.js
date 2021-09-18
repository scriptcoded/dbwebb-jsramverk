/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: [
    '<rootDir>/src'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  collectCoverageFrom: [
    '<rootDir>/**/*.{js,ts}'
  ],
  setupFiles: [
    '<rootDir>/src/jestSetup.ts'
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/index.ts'
  ]
}
