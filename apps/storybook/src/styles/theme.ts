export const lightTheme = {
  colors: {
    background: '#ffffff',
    text: '#24292e',
    primary: '#0366d6',
    secondary: '#586069',
    border: '#e1e4e8',
    code: {
      background: '#f6f8fa',
      text: '#24292e'
    }
  },
  typography: {
    fontFamily: {
      base: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
      code: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace'
    },
    fontSize: {
      small: '0.875rem',
      base: '1rem',
      large: '1.25rem',
      h1: '2rem',
      h2: '1.5rem',
      h3: '1.25rem'
    },
    lineHeight: {
      tight: 1.25,
      base: 1.5,
      relaxed: 1.75
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
  }
} as const;

export const darkTheme = {
  ...lightTheme,
  colors: {
    background: '#0d1117',
    text: '#c9d1d9',
    primary: '#58a6ff',
    secondary: '#8b949e',
    border: '#30363d',
    code: {
      background: '#161b22',
      text: '#c9d1d9'
    }
  }
} as const;

export type Theme = typeof lightTheme;
