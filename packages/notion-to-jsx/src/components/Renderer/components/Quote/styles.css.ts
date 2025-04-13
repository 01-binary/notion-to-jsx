import { style } from '@vanilla-extract/css';
import { vars } from '../../../../styles/theme.css';

export const container = style({
  position: 'relative',
  margin: `${vars.spacing.xs} 0`,
  padding: `${vars.spacing.xs} 0 ${vars.spacing.xs} 1rem`,
  borderLeft: '3px solid #e1e1e1',
  color: '#37352f',
  fontSize: vars.typography.fontSize.base,
  lineHeight: vars.typography.lineHeight.base,
  fontStyle: 'italic',
});
