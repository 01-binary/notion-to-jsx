import { style } from '@vanilla-extract/css';
import { vars } from '../../../../styles/theme.css';

export const toggleContainer = style({
  position: 'relative',
});

export const toggleHeader = style({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  fontSize: vars.typography.fontSize.base,
  fontWeight: vars.typography.fontWeight.normal,
  color: 'inherit',
  padding: `${vars.spacing.xs} 0`,
  borderRadius: vars.borderRadius.sm,
  ':hover': {
    background: 'rgba(55, 53, 47, 0.08)',
  },
});

export const toggleIcon = style({
  marginRight: vars.spacing.sm,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'transform 0.2s ease',
});

export const toggleIconOpen = style({
  transform: 'rotate(90deg)',
});

export const toggleContent = style({
  paddingLeft: vars.spacing.lg,
  marginTop: vars.spacing.xs,
  overflow: 'hidden',
});
