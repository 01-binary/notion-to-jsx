import { style } from '@vanilla-extract/css';
import { vars } from '../../../../styles/theme.css';

// 공통 타이포그래피 스타일
const baseTypography = {
  color: vars.colors.text,
  lineHeight: vars.typography.lineHeight.base,
  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${vars.colors.primary}`,
      outlineOffset: '2px',
      borderRadius: vars.borderRadius.sm,
    },
  },
};

export const paragraph = style({
  ...baseTypography,
  padding: `${vars.spacing.xs} ${vars.spacing.xxs}`,
  fontSize: vars.typography.fontSize.base,
  fontWeight: vars.typography.fontWeight.normal,
  whiteSpace: 'pre-wrap', // 줄바꿈
});

export const heading1 = style({
  ...baseTypography,
  fontSize: vars.typography.fontSize.h1,
  fontWeight: vars.typography.fontWeight.bold,
  padding: `${vars.spacing.xl} 0 ${vars.spacing.md}`,
});

export const heading2 = style({
  ...baseTypography,
  fontSize: vars.typography.fontSize.h2,
  fontWeight: vars.typography.fontWeight.bold,
  padding: `${vars.spacing.lg} 0 ${vars.spacing.sm}`,
});

export const heading3 = style({
  ...baseTypography,
  fontSize: vars.typography.fontSize.h3,
  fontWeight: vars.typography.fontWeight.bold,
  padding: `${vars.spacing.base} 0 ${vars.spacing.xs}`,
});

// Heading 컨테이너 (앵커 링크용)
export const headingContainer = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
});

// 앵커 링크 스타일
export const anchorLink = style({
  opacity: 0,
  color: vars.colors.secondary,
  textDecoration: 'none',
  fontSize: '0.8em',
  transition: 'opacity 0.2s ease',
  selectors: {
    [`${headingContainer}:hover &`]: {
      opacity: 1,
    },
    '&:hover': {
      color: vars.colors.primary,
    },
    '&:focus-visible': {
      opacity: 1,
      outline: `2px solid ${vars.colors.primary}`,
      outlineOffset: '2px',
      borderRadius: vars.borderRadius.sm,
    },
  },
});
