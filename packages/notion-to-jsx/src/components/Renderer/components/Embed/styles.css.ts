import { style } from '@vanilla-extract/css';
import { vars } from '../../../../styles/theme.css';

export const embedContainer = style({
  margin: '10px 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const embedIframe = style({
  width: '100%',
  aspectRatio: '16 / 9',
  border: 'none',
  borderRadius: '8px',
});

export const embedCaption = style({
  marginTop: vars.spacing.sm,
  fontSize: vars.typography.fontSize.small,
  textAlign: 'center',
  width: '100%',
  color: vars.colors.secondary,
});
