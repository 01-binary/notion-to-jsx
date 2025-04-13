import { style } from '@vanilla-extract/css';
import { vars } from '../../../../styles/theme.css';

export const tableContainer = style({
  width: '100%',
  marginTop: vars.spacing.xs,
  marginBottom: vars.spacing.xs,
  borderRadius: vars.borderRadius.sm,
  overflow: 'hidden',
});

export const table = style({
  width: '100%',
  borderCollapse: 'collapse',
  borderSpacing: 0,
  fontSize: vars.typography.fontSize.small,
  color: 'inherit',
});

export const headerCell = style({
  backgroundColor: '#f7f6f3',
  fontWeight: vars.typography.fontWeight.semibold,
});

export const tableCell = style({
  position: 'relative',
  padding: `${vars.spacing.xs} ${vars.spacing.sm}`,
  minHeight: '2rem',
  border: '1px solid rgba(55, 53, 47, 0.09)',
  borderLeft: 'none',
  borderRight: 'none',
  verticalAlign: 'top',
  textAlign: 'left',
  userSelect: 'text',
});

export const firstCell = style({
  borderLeft: '1px solid rgba(55, 53, 47, 0.09)',
});

export const lastCell = style({
  borderRight: '1px solid rgba(55, 53, 47, 0.09)',
});

export const hasRowHeader = style({
  backgroundColor: '#f7f6f3',
  fontWeight: vars.typography.fontWeight.semibold,
});
