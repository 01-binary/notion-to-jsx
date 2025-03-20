import { style } from '@vanilla-extract/css';
import { vars } from '../../../../styles/theme.css';

export const link = style({
  textDecoration: 'none',
  display: 'block',
  paddingTop: vars.spacing.xxs,
  paddingBottom: vars.spacing.xxs,
});

export const card = style({
  display: 'flex',
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.borderRadius.md,
  overflow: 'hidden',
  transition: 'box-shadow 0.2s ease',
  alignItems: 'center',
  maxHeight: '4rem',
  padding: vars.spacing.base,
  paddingLeft: vars.spacing.md,
  gap: vars.spacing.md,
  ':hover': {
    boxShadow: vars.shadows.md,
  },
});

export const content = style({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  justifyContent: 'space-between',
  overflow: 'hidden',
});

export const iconContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '2.5rem',
  height: '100%',
  flexShrink: 0,
});

export const icon = style({
  width: '2.5rem',
  height: '2.5rem',
  objectFit: 'contain',
  borderRadius: vars.borderRadius.sm,
});

export const title = style({
  fontSize: vars.typography.fontSize.base,
  fontWeight: vars.typography.fontWeight.semibold,
  color: vars.colors.text,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const updatedText = style({
  fontSize: vars.typography.fontSize.xs,
  color: vars.colors.secondary,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});
