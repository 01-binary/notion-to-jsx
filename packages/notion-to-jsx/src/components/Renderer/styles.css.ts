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
