import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css';
import { CONTENT_MAX_WIDTH } from '../../styles/layout';

export const container = style({
  maxWidth: CONTENT_MAX_WIDTH,
  margin: '0 auto',
  padding: vars.spacing.xl,
  '@media': {
    [`(max-width: ${CONTENT_MAX_WIDTH})`]: {
      padding: vars.spacing.md,
    },
  },
});

export const tocWrapper = style({
  position: 'fixed',
  right: '2rem',
  top: '20%',
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
