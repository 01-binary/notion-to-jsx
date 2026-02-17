import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
export { skeletonWrapper } from '../../styles/loadingOverlay.css';

export const coverContainer = style({
  position: 'relative',
  width: '100%',
  maxWidth: '56.25rem',
  height: '30vh',
  margin: '0 auto',
  borderRadius: '1.5rem',
  overflow: 'hidden',
  boxShadow: '2px 2px 8px 4px hsla(0,0%,6%,.1)',
  '@media': {
    '(max-width: 900px)': {
      borderRadius: '0.5rem',
      height: '25vh',
    },
  },
});

export const imageStyle = recipe({
  base: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center 50%',
    display: 'block',
    zIndex: 2,
    transition: 'opacity 0.3s ease',
  },
  variants: {
    isLoaded: {
      true: {
        opacity: 1,
      },
      false: {
        opacity: 0,
      },
    },
  },
  defaultVariants: {
    isLoaded: false,
  },
});
