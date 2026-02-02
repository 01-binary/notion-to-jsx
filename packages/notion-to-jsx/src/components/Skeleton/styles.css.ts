import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css';

const shimmer = keyframes({
  '0%': {
    transform: 'translateX(-100%)',
  },
  '100%': {
    transform: 'translateX(100%)',
  },
});

export const skeleton = style({
  display: 'inline-block',
  height: '100%',
  width: '100%',
  backgroundColor: vars.colors.skeleton,
  borderRadius: '4px',
  position: 'relative',
  overflow: 'hidden',
  '::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundImage:
      'linear-gradient(90deg, transparent 0, rgba(255, 255, 255, 0.1) 20%, rgba(255, 255, 255, 0.2) 60%, transparent)',
    animation: `${shimmer} .8s infinite linear`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
  },
});

export const rect = style({
  width: '100%',
  height: '20px',
  marginBottom: '8px',
});

export const circle = style({
  width: '50px',
  height: '50px',
  borderRadius: '50%',
});

export const image = style({
  width: '100%',
  borderRadius: '8px',
});
