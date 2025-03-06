import { style } from '@vanilla-extract/css';
import { vars } from '../../../../styles/theme.css';

export const link = style({
  textDecoration: 'none',
});

export const card = style({
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.borderRadius.md,
  overflow: 'hidden',
  transition: 'box-shadow 0.2s ease',
  ':hover': {
    boxShadow: vars.shadows.md,
  },
});

export const content = style({
  padding: vars.spacing.base,
});

export const previewImage = style({
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  background: vars.colors.code.background,
});

export const title = style({
  padding: `0 0 ${vars.spacing.xs}`,
  fontSize: vars.typography.fontSize.base,
  color: vars.colors.text,
});

export const description = style({
  padding: 0,
  fontSize: vars.typography.fontSize.small,
  color: vars.colors.secondary,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

export const siteName = style({
  paddingTop: vars.spacing.sm,
  fontSize: vars.typography.fontSize.small,
  color: vars.colors.primary,
});
