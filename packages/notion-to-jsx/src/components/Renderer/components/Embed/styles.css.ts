import { style } from '@vanilla-extract/css';
import { vars } from '../../../../styles/theme.css';

export const embedIframe = style({
  width: '100%',
  aspectRatio: '16 / 9',
  border: 'none',
  borderRadius: vars.borderRadius.lg,
});
