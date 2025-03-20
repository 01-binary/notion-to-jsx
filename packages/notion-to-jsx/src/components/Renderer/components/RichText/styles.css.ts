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
        background: vars.colors.code.inlineBackground,
        padding: '0.1em 0.35em',
        borderRadius: vars.borderRadius.sm,
        fontWeight: vars.typography.fontWeight.medium,
        fontFamily: vars.typography.fontFamily.code,
        fontSize: '0.85em',
        color: vars.colors.code.inline,
        display: 'inline-block',
        verticalAlign: 'middle',
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
