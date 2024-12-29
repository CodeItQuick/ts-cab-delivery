import {defaults} from 'jest-config';
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/**/*.spec.ts'],
  testPathIgnorePatterns: ['/node_modules/', 'dist'],
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: ['node_modules', 'tests'],
  reporters: ['default', 'jest-junit'],
  transform: {},
  rootDir: "./",
  moduleDirectories: ["node_modules", "src"]
};