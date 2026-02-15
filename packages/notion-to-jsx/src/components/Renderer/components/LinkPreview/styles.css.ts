import { style } from '@vanilla-extract/css';
import { vars } from '../../../../styles/theme.css';

export const link = style({
  textDecoration: 'none',
  display: 'block',
  paddingTop: vars.spacing.xxs,
  paddingBottom: vars.spacing.xxs,
  ':hover': {
    textDecoration: 'none',
  },
});

export const preview = style({
  display: 'flex',
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.borderRadius.md,
  overflow: 'hidden',
  transition: 'box-shadow 0.2s ease',
  alignItems: 'center',
  padding: vars.spacing.base,
  gap: vars.spacing.md,
  ':hover': {
    boxShadow: vars.shadows.md,
  },
});

export const content = style({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  overflow: 'hidden',
});

export const iconContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2.5rem',
  height: '2.5rem',
  flexShrink: 0,
});

export const icon = style({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  borderRadius: vars.borderRadius.sm,
});

export const title = style({
  fontSize: vars.typography.fontSize.base,
  fontWeight: vars.typography.fontWeight.semibold,
  color: vars.colors.text,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const description = style({
  fontSize: vars.typography.fontSize.xs,
  color: vars.colors.secondary,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

/**
 * 타입별 특수 스타일: 각 링크 타입에만 필요한 추가 스타일
 */

// GitHub 프리뷰에만 필요한 스타일
export const githubPreview = style({
  maxHeight: '4rem',
  paddingLeft: vars.spacing.md,
});

// GitHub 컨텐츠에만 필요한 스타일
export const githubContent = style({
  justifyContent: 'space-between',
});
