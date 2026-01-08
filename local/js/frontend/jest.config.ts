export default {
  verbose: true,
  silent: true,
  collectCoverageFrom: ['**/*.{ts,tsx,mts,cts,js,jsx,mjs,cjs}', '!**/node_modules/**'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  transformIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.(ts|tsx|mts|cts|js|jsx|mjs|cjs)$': ['babel-jest'],
  },
};
