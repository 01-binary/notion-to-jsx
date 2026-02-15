import { style } from '@vanilla-extract/css';
import { vars } from '../../../../styles/theme.css';

export const link = style({
  textDecoration: 'none',
  display: 'block',
  paddingTop: vars.spacing.xs,
  paddingBottom: vars.spacing.xs,
  ':hover': {
    textDecoration: 'none',
  },
});

export const card = style({
  display: 'flex',
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.borderRadius.md,
  overflow: 'hidden',
  transition: 'box-shadow 0.2s ease',
  maxHeight: '8rem',
  ':hover': {
    boxShadow: vars.shadows.md,
  },
});

export const content = style({
  padding: vars.spacing.base,
  display: 'flex',
  flex: '4 1 180px',
  flexDirection: 'column',
  justifyContent: 'space-between',
  overflow: 'hidden',
});

export const previewContainer = style({
  display: 'flex',
  flex: '1 1 180px',
  alignItems: 'center',
  justifyContent: 'center',
  maxHeight: '8rem',
  overflow: 'hidden',
  '@media': {
    '(max-width: 420px)': {
      display: 'none',
    },
  },
});

export const previewImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
  borderRadius: vars.borderRadius.sm,
});

export const title = style({
  padding: 0,
  paddingBottom: vars.spacing.xs,
  fontSize: vars.typography.fontSize.base,
  fontWeight: vars.typography.fontWeight.semibold,
  color: vars.colors.text,
  minHeight: '1.5rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const description = style({
  padding: 0,
  paddingBottom: vars.spacing.xs,
  fontSize: vars.typography.fontSize.xs,
  color: vars.colors.secondary,
  height: '2.25rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
});

export const siteName = style({
  minHeight: '1rem',
  paddingTop: vars.spacing.sm,
  fontSize: vars.typography.fontSize.xs,
  color: vars.colors.primary,
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
  width: '100%',
});

export const favicon = style({
  width: '1rem',
  height: '1rem',
  flexShrink: 0,
});

export const urlText = style({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  maxWidth: '100%',
});
