import { style } from '@vanilla-extract/css';
import { vars } from '../../../../styles/theme.css';

export const videoPlayer = style({
  width: '100%',
  aspectRatio: '16 / 9',
  border: 'none',
});

export const nativeVideo = style({
  width: '100%',
  maxWidth: '100%',
  borderRadius: vars.borderRadius.lg,
});
