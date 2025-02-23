import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../../../../styles/theme.css';

export const list = recipe({
  base: {
    margin: `${vars.spacing.sm} 0`,
    paddingLeft: vars.spacing.xl,
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

export const listItem = style({
  margin: `${vars.spacing.xs} 0`,
});
