import path from 'node:path';
import { cwd } from 'node:process';
import swc from 'unplugin-swc';
import { defaultExclude, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    root: './',
    exclude: [...defaultExclude, '**/minio/**', '**/docker/**'],
    setupFiles: ['dotenv/config'],
    fileParallelism: false,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'cobertura'],
      cleanOnRerun: true,
    },
    testTimeout: 15000,
    hookTimeout: 15000,
  },
  plugins: [
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(cwd(), './src'),
    },
  },
});