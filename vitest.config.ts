import { defineConfig } from 'vitest/config';
import path from 'path';
import swc from 'unplugin-swc';

export default defineConfig({
  plugins: [
    // This is required to build the test files with SWC
    swc.vite({
      // Explicitly set the module type to avoid inheriting this value from a `.swcrc` config file
      module: { type: 'es6' },
    }),
  ],
  test: {
    deps: {
      interopDefault: true,
    },
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
    reporters: 'default',
    include: ['**/*.spec.ts'],
  },
  root: '.',
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
});
