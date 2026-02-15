import '@testing-library/jest-dom/vitest';
import { vi, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

// Mock vanilla-extract packages for jsdom environment
vi.mock('@vanilla-extract/css', () => ({
  style: () => 'mocked-style',
  globalStyle: () => {},
  createThemeContract: () =>
    new Proxy(
      {},
      {
        get: () =>
          new Proxy(
            {},
            {
              get: () => '',
            }
          ),
      }
    ),
  createTheme: () => ['mocked-theme', {}],
  createVar: () => '',
  keyframes: () => 'mocked-keyframes',
  fontFace: () => '',
  styleVariants: () => ({}),
  createGlobalTheme: () => {},
}));

vi.mock('@vanilla-extract/recipes', () => ({
  recipe: (config: Record<string, unknown>) => {
    const fn = () => 'mocked-recipe';
    fn.variants = config?.variants ?? {};
    return fn;
  },
}));

vi.mock('@vanilla-extract/sprinkles', () => ({
  defineProperties: () => ({}),
  createSprinkles: () => () => 'mocked-sprinkles',
}));
