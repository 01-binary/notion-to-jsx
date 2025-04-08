import { style } from '@vanilla-extract/css';

export const cover = style({
  width: '100%',
  maxWidth: '56.25rem',
  height: '30vh',
  display: 'block',
  objectFit: 'cover',
  objectPosition: 'center 50%',
  borderRadius: '1.5rem',
  margin: '0 auto',
});
