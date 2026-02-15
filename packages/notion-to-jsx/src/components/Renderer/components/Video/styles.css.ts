import { style } from '@vanilla-extract/css';

export const videoPlayer = style({
  width: '100%',
  aspectRatio: '16 / 9',
  border: 'none',
});

export const nativeVideo = style({
  width: '100%',
  maxWidth: '100%',
  borderRadius: '8px',
});
