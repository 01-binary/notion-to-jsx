import React from 'react';
import styled from 'styled-components';
import { RichTextItem } from '../types';

interface StyledTextProps {
  $bold?: boolean;
  $italic?: boolean;
  $strikethrough?: boolean;
  $underline?: boolean;
  $code?: boolean;
  $color?: string;
}

const StyledText = styled.span<StyledTextProps>`
  font-weight: ${({ $bold }) => ($bold ? 'bold' : 'normal')};
  font-style: ${({ $italic }) => ($italic ? 'italic' : 'normal')};
  text-decoration: ${({ $strikethrough, $underline }) => {
    if ($strikethrough && $underline) return 'line-through underline';
    if ($strikethrough) return 'line-through';
    if ($underline) return 'underline';
    return 'none';
  }};
  ${({ $code, theme }) =>
    $code &&
    `
    background: ${theme.colors.code.background};
    padding: 0.2em 0.4em;
    border-radius: ${theme.borderRadius.sm};
    font-family: ${theme.typography.fontFamily.code};
    font-size: 0.85em;
  `}
  color: ${({ $color, theme }) => {
    if ($color === 'default') return 'inherit';
    if ($color?.includes('_background')) {
      const baseColor = $color.replace('_background', '');
      return `var(--notion-${baseColor})`;
    }
    return `var(--notion-${$color})`;
  }};
`;

interface RichTextProps {
  richText: RichTextItem[];
}

export const RichText: React.FC<RichTextProps> = ({ richText }) => {
  return (
    <>
      {richText.map((text, index) => {
        const { bold, italic, strikethrough, underline, code, color } = text.annotations;

        const content = text.text.link ? (
          <a
            href={text.text.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'underline' }}
          >
            {text.text.content}
          </a>
        ) : (
          text.text.content
        );

        return (
          <StyledText
            key={index}
            $bold={bold}
            $italic={italic}
            $strikethrough={strikethrough}
            $underline={underline}
            $code={code}
            $color={color}
          >
            {content}
          </StyledText>
        );
      })}
    </>
  );
};
