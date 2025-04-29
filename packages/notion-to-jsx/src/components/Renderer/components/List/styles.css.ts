import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../../../../styles/theme.css';

export const list = recipe({
  base: {
    padding: `${vars.spacing.xs} ${vars.spacing.xxs}`,
    paddingLeft: vars.spacing.lg,
    color: vars.colors.text,
  },
  variants: {
    type: {
      bulleted_list_item: {
        listStyleType: 'disc',
      },
      numbered_list_item: {
        listStyleType: 'decimal',
      },
    },
  },
});

export const listItem = style({
  padding: `${vars.spacing.xxs} 0`,
});
