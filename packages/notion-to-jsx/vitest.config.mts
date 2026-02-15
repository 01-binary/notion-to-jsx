import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    reporters: process.env.GITHUB_ACTIONS
      ? ['junit', 'default', 'github-actions']
      : ['junit', 'default'],
    outputFile: 'test-results.xml',
  },
});
