import { style } from '@vanilla-extract/css';
import { vars } from '../../../../styles/theme.css';

export const captionStyle = style({
  marginTop: vars.spacing.sm,
  fontSize: vars.typography.fontSize.small,
  textAlign: 'center',
  width: '100%',
  color: vars.colors.secondary,
});

export const mediaContainer = style({
  margin: '10px 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});
