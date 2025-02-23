import { style } from '@vanilla-extract/css';
import { vars } from '../../../../styles/theme.css';

export const caption = style({
  marginTop: vars.spacing.sm,
  fontSize: vars.typography.fontSize.small,
  color: vars.colors.secondary,
});

export const bookmarkCard = style({
  margin: `${vars.spacing.md} 0`,
  padding: vars.spacing.md,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.borderRadius.md,
  transition: 'box-shadow 0.2s ease',
  ':hover': {
    boxShadow: vars.shadows.sm,
  },
});

export const bookmarkLink = style({
  color: vars.colors.primary,
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline',
  },
});
