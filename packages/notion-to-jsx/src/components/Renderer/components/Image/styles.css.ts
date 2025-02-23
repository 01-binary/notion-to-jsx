import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../../../../styles/theme.css';

export const imageContainer = style({
  position: 'relative',
  width: '100%',
  background: vars.colors.code.background,
  borderRadius: vars.borderRadius.md,
  overflow: 'hidden',
});

export const styledImage = recipe({
  base: {
    width: '100%',
    height: 'auto',
    display: 'block',
    transition: 'opacity 0.3s ease',
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
  },
  defaultVariants: {
    loaded: false,
  },
});

export const placeholder = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: vars.colors.code.background,
  color: vars.colors.secondary,
});

export const caption = style({
  textAlign: 'center',
  color: vars.colors.secondary,
  marginTop: vars.spacing.sm,
  fontSize: vars.typography.fontSize.small,
});
