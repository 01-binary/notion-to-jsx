import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  target: 'esnext',
  format: ['esm'],
  splitting: true,
  treeshake: true,
  clean: true,
  dts: true,
  minify: true,
});
