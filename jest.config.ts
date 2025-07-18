export default {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': 'esbuild-jest',
  },
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  setupFilesAfterEnv: ['./jsdom.mocks.ts', './jest.react.ts'],
  moduleNameMapper: {
    '@empoleon/(.*)': '<rootDir>/packages/@empoleon/$1/src',
    '@empoleon-tests/(.*)': '<rootDir>/packages/@empoleon-tests/$1/src',
    '\\.(css)$': 'identity-obj-proxy',
    '(\\.+/.+)\\.js$': '$1',
  },
};
