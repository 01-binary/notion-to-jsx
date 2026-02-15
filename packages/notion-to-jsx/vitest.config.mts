import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.ts'],
    reporters: process.env.GITHUB_ACTIONS
      ? ['junit', 'default', 'github-actions']
      : ['junit', 'default'],
    outputFile: 'test-results.xml',
    css: {
      modules: { classNameStrategy: 'non-scoped' },
    },
  },
});
