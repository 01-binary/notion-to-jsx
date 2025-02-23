import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css';

export const container = style({
  maxWidth: '900px',
  margin: '0 auto',
  padding: vars.spacing.xl,
});
