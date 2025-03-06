import { createTheme, createThemeContract } from '@vanilla-extract/css';

/**
 * 이 변수는 테마의 구조만 정의하며, 실제 값은 없습니다.
 * 실제 테마 값은 아래의 테마 객체에서 확인하세요:
 * - {@link lightTheme} - 라이트 테마 값
 * - {@link darkTheme} - 다크 테마 값
 * - {@link commonThemeValues} - 공통 테마 값
 */

export const vars = createThemeContract({
  colors: {
    background: null,
    text: null,
    primary: null,
    secondary: null,
    border: null,
    code: {
      background: null,
      text: null,
      inline: null,
    },
  },
  typography: {
    fontFamily: {
      base: null,
      code: null,
    },
    fontSize: {
      xs: null,
      small: null,
      base: null,
      large: null,
      h1: null,
      h2: null,
      h3: null,
    },
    fontWeight: {
      normal: null,
      medium: null,
      semibold: null,
      bold: null,
    },
    lineHeight: {
      tight: null,
      base: null,
      relaxed: null,
    },
  },
  spacing: {
    xxs: null,
    xs: null,
    sm: null,
    base: null,
    md: null,
    lg: null,
    xl: null,
  },
  borderRadius: {
    sm: null,
    md: null,
    lg: null,
  },
  shadows: {
    sm: null,
    md: null,
    lg: null,
  },
});

/**
 * 공통 테마 값
 *
 * 라이트 테마와 다크 테마에서 공통으로 사용되는 값들입니다.
 */
const commonThemeValues = {
  typography: {
    fontFamily: {
      base: 'ui-sans-serif -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
      code: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace',
    },
    fontSize: {
      xs: '0.75rem',
      small: '0.875rem',
      base: '1rem',
      large: '1.25rem',
      h1: '2rem',
      h2: '1.5rem',
      h3: '1.25rem',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: '1.25',
      base: '1.5',
      relaxed: '1.75',
    },
  },
  spacing: {
    xxs: '0.125rem',
    xs: '0.25rem',
    sm: '0.5rem',
    base: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
  },
};

/**
 * 라이트 테마
 *
 * 밝은 배경에 어두운 텍스트를 사용하는 기본 테마입니다.
 */
export const lightTheme = createTheme(vars, {
  ...commonThemeValues,
  colors: {
    background: '#ffffff',
    text: '#37352f',
    primary: '#0366d6',
    secondary: '#586069',
    border: '#e1e4e8',
    code: {
      background: 'rgba(135,131,120,.1)',
      text: '#24292e',
      inline: '#EB5757',
    },
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
});

/**
 * 다크 테마
 *
 * 어두운 배경에 밝은 텍스트를 사용하는 테마입니다.
 */
export const darkTheme = createTheme(vars, {
  ...commonThemeValues,
  colors: {
    background: '#0d1117',
    text: '#c9d1d9',
    primary: '#58a6ff',
    secondary: '#8b949e',
    border: '#30363d',
    code: {
      background: '#161b22',
      text: '#c9d1d9',
      inline: '#EB5757',
    },
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 3px 4px 0 rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
});
