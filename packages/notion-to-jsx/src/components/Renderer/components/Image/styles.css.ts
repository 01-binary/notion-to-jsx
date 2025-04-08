import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { createVar, fallbackVar } from '@vanilla-extract/css';
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

// CSS 변수 생성
export const imageWidthVar = createVar();
export const imageAspectRatioVar = createVar();

export const imageWrapper = recipe({
  base: {
    position: 'relative',
    maxWidth: '100%',
    width: fallbackVar(imageWidthVar, '100%'),
  },
  variants: {
    hasWidth: {
      true: {},
      false: {
        width: '100%',
      },
    },
  },
  defaultVariants: {
    hasWidth: false,
  },
});

export const styledImage = recipe({
  base: {
    width: '100%',
    height: 'auto',
    display: 'block',
    transition: 'opacity 0.3s ease',
    objectFit: 'contain',
    aspectRatio: fallbackVar(imageAspectRatioVar, 'auto'),
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
      true: {},
      false: {},
    },
  },
  defaultVariants: {
    loaded: false,
    hasAspectRatio: false,
  },
});

export const placeholder = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const caption = style({
  textAlign: 'center',
  color: vars.colors.secondary,
  marginTop: vars.spacing.sm,
  fontSize: vars.typography.fontSize.small,
});
