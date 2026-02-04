import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css';

export const container = style({
  maxWidth: '720px',
  margin: '0 auto',
  padding: vars.spacing.xl,
  '@media': {
    '(max-width: 720px)': {
      padding: vars.spacing.md,
    },
  },
});

export const tocWrapper = style({
  position: 'fixed',
  right: '2rem',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 100,
  width: 'auto',
  minWidth: '40px',
  overflow: 'visible',
  '@media': {
    '(max-width: 900px)': {
      display: 'none',
    },
  },
});
