import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../../../../styles/theme.css';

export const richText = recipe({
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
    color: {
      default: {},
      gray: { color: vars.colors.notion.gray },
      brown: { color: vars.colors.notion.brown },
      orange: { color: vars.colors.notion.orange },
      yellow: { color: vars.colors.notion.yellow },
      green: { color: vars.colors.notion.green },
      blue: { color: vars.colors.notion.blue },
      purple: { color: vars.colors.notion.purple },
      pink: { color: vars.colors.notion.pink },
      red: { color: vars.colors.notion.red },
      gray_background: { backgroundColor: vars.colors.notion.gray_background },
      brown_background: {
        backgroundColor: vars.colors.notion.brown_background,
      },
      orange_background: {
        backgroundColor: vars.colors.notion.orange_background,
      },
      yellow_background: {
        backgroundColor: vars.colors.notion.yellow_background,
      },
      green_background: {
        backgroundColor: vars.colors.notion.green_background,
      },
      blue_background: { backgroundColor: vars.colors.notion.blue_background },
      purple_background: {
        backgroundColor: vars.colors.notion.purple_background,
      },
      pink_background: { backgroundColor: vars.colors.notion.pink_background },
      red_background: { backgroundColor: vars.colors.notion.red_background },
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
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
});
