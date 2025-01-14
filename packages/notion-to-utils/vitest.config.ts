import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    reporters: process.env.GITHUB_ACTIONS
      ? ['junit', 'default', 'github-actions']
      : ['junit', 'default'],
    outputFile: 'test-results.xml',
    coverage: {
      reporter: ['text', 'json-summary', 'json'],
      reportsDirectory: './coverage',
      reportOnFailure: true,
    },
  },
});
