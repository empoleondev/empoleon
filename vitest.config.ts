import path from 'path';
import solid from 'vite-plugin-solid';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [solid()],
  resolve: {
    alias: {
      '@empoleon/core': path.resolve(__dirname, 'packages/@empoleon/core/src'),
    },
  },

  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.tsx'],
    globals: true,
    testTimeout: 10000,
    pool: 'forks',
    isolate: true,
    // include: [
    //   '**/ColorInput/*.test.{ts,tsx}'
    // ],
    exclude: [
      // Exclude all node_modules test files
      'node_modules/**',
    ],
  },
});
