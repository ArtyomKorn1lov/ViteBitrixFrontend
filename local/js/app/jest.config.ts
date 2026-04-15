import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  verbose: true,
  silent: false,
  collectCoverageFrom: ['**/*.{ts,tsx,mts,cts,js,jsx,mjs,cjs}', '!**/node_modules/**'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  transformIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.(ts|tsx|mts|cts)$': ['ts-jest', { tsconfig: 'tsconfig.spec.json' }],
    '^.+\\.(js|jsx|mjs|cjs)$': 'babel-jest',
  },
};

export default config;
