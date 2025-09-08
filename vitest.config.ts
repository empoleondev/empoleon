import { defineConfig } from 'vitest/config';
import solid from 'vite-plugin-solid';
import path from 'path';

export default defineConfig({
  plugins: [solid()],
  resolve: {
    alias: {
      '@empoleon/core': path.resolve(__dirname, 'packages/@empoleon/core/src')
    }
  },

  test: {
    environment: 'jsdom',
    // include: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
    setupFiles: ['./vitest.setup.tsx'],
    globals: true,
    testTimeout: 10000,
    pool: 'forks',
    isolate: true,
    // include: [
    //   '**/Table.components.test.tsx'
    // ],
    exclude: [
      '**/dates/**',
      '**/default-css-variables-resolver.test.ts',
      '**/Carousel.test.tsx',
      '**/Dropzone.test.tsx',
      '**/Spotlight.test.tsx',
      // form
      '**/use-field/**',
      '**/use-form/**',
      '**/clearErrors.test.ts',
      '**/clearFieldError.test.ts',
      // Exclude all node_modules test files
      'node_modules/**',
    ]
  },
});
