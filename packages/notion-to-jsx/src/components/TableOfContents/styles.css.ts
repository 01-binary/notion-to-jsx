import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css';

// ============================================
// 컨테이너
// ============================================
export const tocContainer = style({
  position: 'relative',
});

// ============================================
// 선 컴포넌트 (기본 상태)
// ============================================
export const linesWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '12px',
});

export const line = style({
  height: '2.5px',
  backgroundColor: vars.colors.border,
  borderRadius: '5px',
});

export const lineLevel1 = style({
  width: '32px',
});

export const lineLevel2 = style({
  width: '22px',
});

export const lineLevel3 = style({
  width: '14px',
});

// ============================================
// 메뉴 컴포넌트 (호버 시 표시)
// ============================================
export const menuWrapper = style({
  position: 'absolute',
  top: 0,
  right: 0,
  opacity: 0,
  pointerEvents: 'none',
  transition: 'opacity 0.15s ease',
  selectors: {
    [`${tocContainer}:hover &`]: {
      opacity: 1,
      pointerEvents: 'auto',
    },
  },
});

export const menuList = style({
  display: 'flex',
  flexDirection: 'column',
  listStyle: 'none',
  padding: vars.spacing.sm,
  margin: 0,
  gap: '1px',
  backgroundColor: vars.colors.background,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.borderRadius.lg,
  boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)',
  maxHeight: '60vh',
  overflowY: 'auto',
});

export const menuLink = style({
  display: 'block',
  textDecoration: 'none',
  fontSize: vars.typography.fontSize.small,
  lineHeight: 1.4,
  color: vars.colors.secondary,
  padding: `4px ${vars.spacing.sm}`,
  borderRadius: vars.borderRadius.sm,
  whiteSpace: 'nowrap',
  ':hover': {
    backgroundColor: vars.colors.hoverBackground,
  },
});

export const menuLinkLevel1 = style({
  paddingLeft: vars.spacing.sm,
});

export const menuLinkLevel2 = style({
  paddingLeft: vars.spacing.lg,
});

export const menuLinkLevel3 = style({
  paddingLeft: vars.spacing.xl,
});

// ============================================
// Active 상태 (현재 보이는 섹션)
// ============================================
export const lineActive = style({
  backgroundColor: vars.colors.text,
});

export const menuLinkActive = style({
  color: vars.colors.primary,
});
