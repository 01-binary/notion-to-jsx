import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../../../../styles/theme.css';

export const richText = recipe({
  base: {
    fontFamily: 'inherit',
  },

  variants: {
    bold: {
      true: {
        fontWeight: 'bold',
      },
    },
    italic: {
      true: {
        fontStyle: 'italic',
      },
    },
    strikethrough: {
      true: {
        textDecoration: 'line-through',
      },
    },
    underline: {
      true: {
        textDecoration: 'underline',
      },
    },
    code: {
      true: {
        background: vars.colors.code.background,
        padding: '0.2em 0.4em',
        borderRadius: vars.borderRadius.sm,
        fontFamily: vars.typography.fontFamily.code,
        fontSize: '0.85em',
      },
    },
  },

  compoundVariants: [
    {
      variants: {
        strikethrough: true,
        underline: true,
      },
      style: {
        textDecoration: 'line-through underline',
      },
    },
  ],
});

export const link = style({
  color: 'inherit',
  textDecoration: 'underline',
});
