import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../../../../styles/theme.css';

export const list = recipe({
  base: {
    paddingLeft: vars.spacing.lg,
  },
  variants: {
    type: {
      bulleted: {
        listStyleType: 'disc',
      },
      numbered: {
        listStyleType: 'decimal',
      },
    },
  },
});

export const listItem = style({});
