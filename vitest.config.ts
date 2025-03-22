import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom', // Simulate a browser environment
    coverage: {
      provider: 'v8', // 'v8' is fast and built-in
      reporter: ['text', 'json', 'html'], // Generates coverage reports
      exclude: ['*.config.*', 'next-env.d.ts', 'src/app/layout.tsx', '.next/**'],
    },
  },
});
