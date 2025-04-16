import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../../../../styles/theme.css';

export const imageContainer = style({
  position: 'relative',
  width: '100%',
  padding: `${vars.spacing.sm} 0`,
  borderRadius: vars.borderRadius.md,
  overflow: 'hidden',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const imageWrapper = style({
  position: 'relative',
  maxWidth: '100%',
});

export const imageStyle = recipe({
  base: {
    width: '100%',
    height: 'auto',
    display: 'block',
    transition: 'opacity 0.3s ease',
    objectFit: 'contain',
  },
  variants: {
    loaded: {
      true: {
        opacity: 1,
      },
      false: {
        opacity: 0,
      },
    },
    hasAspectRatio: {
      true: {
        // aspectRatio는 recipe 단계에서는 빈 객체로 두고
        // 컴포넌트에서 동적으로 계산된 값으로 채워집니다
      },
      false: {
        aspectRatio: 'auto',
      },
    },
  },
  defaultVariants: {
    loaded: false,
    hasAspectRatio: false,
  },
});

export const caption = style({
  textAlign: 'center',
  color: vars.colors.secondary,
  marginTop: vars.spacing.sm,
  fontSize: vars.typography.fontSize.small,
});

export const skeletonWrapper = recipe({
  base: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
    transition: 'opacity 0.3s ease',
  },
  variants: {
    isLoaded: {
      true: {
        opacity: 0,
      },
      false: {
        opacity: 1,
      },
    },
  },
  defaultVariants: {
    isLoaded: false,
  },
});
