import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom', // Simulate a browser environment
    coverage: {
      provider: 'v8', // 'v8' is fast and built-in
      reporter: ['text', 'json', 'html'], // Generates coverage reports
    },
  },
});
