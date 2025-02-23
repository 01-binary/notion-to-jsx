import { style } from '@vanilla-extract/css';
import { vars } from '../../../../styles/theme.css';

// 공통 타이포그래피 스타일
const baseTypography = {
  color: vars.colors.text,
  fontFamily: vars.typography.fontFamily.base,
  lineHeight: vars.typography.lineHeight.base,
  ':hover': {
    backgroundColor: vars.colors.background,
    opacity: 0.8,
  },
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
  margin: `${vars.spacing.sm} 0`,
  fontSize: vars.typography.fontSize.base,
});

export const heading1 = style({
  ...baseTypography,
  fontSize: vars.typography.fontSize.h1,
  // fontWeight: vars.typography.fontWeight.bold,
  margin: `${vars.spacing.lg} 0 ${vars.spacing.md}`,
});

export const heading2 = style({
  ...baseTypography,
  fontSize: vars.typography.fontSize.h2,
  // fontWeight: vars.typography.fontWeight.semibold,
  margin: `${vars.spacing.md} 0 ${vars.spacing.sm}`,
});

export const heading3 = style({
  ...baseTypography,
  fontSize: vars.typography.fontSize.h3,
  // fontWeight: vars.typography.fontWeight.medium,
  margin: `${vars.spacing.sm} 0 ${vars.spacing.xs}`,
});
