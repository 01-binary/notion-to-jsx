import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from '../../../../styles/theme.css';

export const codeBlock = style({
  backgroundColor: vars.colors.code.background,
  color: vars.colors.code.text,
  padding: vars.spacing.md,
  borderRadius: vars.borderRadius.md,
  overflow: 'auto',
  fontFamily: vars.typography.fontFamily.code,
  fontSize: '0.85em',
  lineHeight: vars.typography.lineHeight.relaxed,
  margin: `${vars.spacing.sm} 0`,
});

globalStyle(`${codeBlock} code`, {
  fontFamily: 'inherit',
});

globalStyle(
  `${codeBlock} .token.comment, ${codeBlock} .token.prolog, ${codeBlock} .token.doctype, ${codeBlock} .token.cdata`,
  {
    color: '#666666',
    fontStyle: 'italic',
  }
);

globalStyle(`${codeBlock} .token.punctuation`, {
  color: '#999999',
});

globalStyle(
  `${codeBlock} .token.property, ${codeBlock} .token.tag, ${codeBlock} .token.boolean, ${codeBlock} .token.number, ${codeBlock} .token.constant, ${codeBlock} .token.symbol`,
  {
    color: '#905',
  }
);

globalStyle(
  `${codeBlock} .token.selector, ${codeBlock} .token.attr-name, ${codeBlock} .token.string, ${codeBlock} .token.char, ${codeBlock} .token.builtin`,
  {
    color: '#690',
  }
);

globalStyle(
  `${codeBlock} .token.operator, ${codeBlock} .token.entity, ${codeBlock} .token.url, ${codeBlock} .language-css .token.string, ${codeBlock} .style .token.string`,
  {
    color: '#9a6e3a',
  }
);

globalStyle(
  `${codeBlock} .token.atrule, ${codeBlock} .token.attr-value, ${codeBlock} .token.keyword`,
  {
    color: '#07a',
  }
);

globalStyle(`${codeBlock} .token.function, ${codeBlock} .token.class-name`, {
  color: '#dd4a68',
});

globalStyle(
  `${codeBlock} .token.regex, ${codeBlock} .token.important, ${codeBlock} .token.variable`,
  {
    color: '#e90',
  }
);
