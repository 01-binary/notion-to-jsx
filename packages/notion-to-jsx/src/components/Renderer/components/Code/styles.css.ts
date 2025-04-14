import { style } from '@vanilla-extract/css';
import { vars } from '../../../../styles/theme.css';

export const codeBlock = style({
  backgroundColor: vars.colors.code.background,
  color: vars.colors.code.text,
  padding: vars.spacing.md,
  borderRadius: vars.borderRadius.md,
  overflow: 'auto',
  fontFamily: vars.typography.fontFamily.code,
  fontSize: '0.85rem',
  lineHeight: vars.typography.lineHeight.relaxed,
  margin: `${vars.spacing.sm} 0`,
});
