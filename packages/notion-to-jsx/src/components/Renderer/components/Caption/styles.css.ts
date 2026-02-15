import { style } from '@vanilla-extract/css';
import { vars } from '../../../../styles/theme.css';

export const captionStyle = style({
  marginTop: vars.spacing.sm,
  fontSize: vars.typography.fontSize.small,
  textAlign: 'center',
  width: '100%',
  color: vars.colors.secondary,
});
