import { style } from '@vanilla-extract/css';
import { vars } from '../../../../styles/theme.css';

export const videoContainer = style({
  margin: '10px 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', // 비디오를 가운데 정렬
});

export const videoPlayer = style({
  width: '100%',
  aspectRatio: '16 / 9',
  border: 'none', // frameBorder="0" 대체
});

export const videoCaption = style({
  marginTop: vars.spacing.sm,
  fontSize: vars.typography.fontSize.small,
  textAlign: 'center', // 캡션 가운데 정렬
  width: '100%',
  color: vars.colors.secondary,
});
