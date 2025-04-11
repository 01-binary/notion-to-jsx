import { style } from '@vanilla-extract/css';

export const columnContainer = style({
  flex: 1,
  minWidth: 0,
});

export const columnListContainer = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '1rem',
  marginBottom: '1rem',
  width: '100%',
  '@media': {
    '(max-width: 420px)': {
      flexDirection: 'column',
    },
  },
});
