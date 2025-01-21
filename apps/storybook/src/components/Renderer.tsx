// import { Client } from 'notion-to-utils';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import { lightTheme, darkTheme, Theme } from '../styles/theme';
import { NotionBlock } from '../types';
import {
  MemoizedRichText,
  MemoizedImage,
  MemoizedBookmark,
} from './MemoizedComponents';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import testData from '../constants/test.json';

interface RichTextItem {
  type: 'text';
  text: {
    content: string;
    link: string | null;
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href: string | null;
}

const notion = {
  getPageBlocks: async () => {
    return testData as NotionBlock[];
  },
};

const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.typography.fontFamily.base};
    line-height: ${({ theme }) => theme.typography.lineHeight.base};
    margin: 0;
    padding: 0;
  }
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Paragraph = styled.p`
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

const Heading1 = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.h1};
  margin: ${({ theme }) => theme.spacing.lg} 0
    ${({ theme }) => theme.spacing.md};
`;

const Heading2 = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.h2};
  margin: ${({ theme }) => theme.spacing.md} 0
    ${({ theme }) => theme.spacing.sm};
`;

const Heading3 = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.h3};
  margin: ${({ theme }) => theme.spacing.sm} 0
    ${({ theme }) => theme.spacing.xs};
`;

const List = styled.ul<{ type: 'bulleted' | 'numbered' }>`
  margin: ${({ theme }) => theme.spacing.sm} 0;
  padding-left: ${({ theme }) => theme.spacing.xl};
  list-style-type: ${({ type }) => (type === 'bulleted' ? 'disc' : 'decimal')};
`;

const ListItem = styled.li`
  margin: ${({ theme }) => theme.spacing.xs} 0;
`;

const CodeBlockWrapper = styled.pre`
  background: ${({ theme }) => theme.colors.code.background};
  color: ${({ theme }) => theme.colors.code.text};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: auto;
  font-family: ${({ theme }) => theme.typography.fontFamily.code};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
`;

const Caption = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  color: ${({ theme }) => theme.colors.secondary};
`;

const ImageWrapper = styled.figure`
  margin: ${({ theme }) => theme.spacing.md} 0;
  max-width: 100%;

  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: ${({ theme }) => theme.borderRadius.md};
  }
`;

const BookmarkCard = styled.div`
  margin: ${({ theme }) => theme.spacing.md} 0;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
`;

const BookmarkLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const CodeBlock: React.FC<{
  code: string;
  language: string;
  caption?: RichTextItem[];
}> = ({ code, language, caption }) => {
  const highlightedCode = useMemo(() => {
    const prismLanguage =
      Prism.languages[language] || Prism.languages.plaintext;
    return Prism.highlight(code, prismLanguage, language);
  }, [code, language]);

  return (
    <CodeBlockWrapper>
      <code
        className={`language-${language}`}
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
      {caption && caption.length > 0 && (
        <Caption>
          <MemoizedRichText richText={caption} />
        </Caption>
      )}
    </CodeBlockWrapper>
  );
};

const ListBlocksRenderer: React.FC<{
  blocks: NotionBlock[];
  startIndex: number;
  type: 'bulleted' | 'numbered';
}> = ({ blocks, startIndex, type }) => {
  let consecutiveItems = 0;
  for (let i = startIndex; i < blocks.length; i++) {
    if (blocks[i].type === `${type}_list_item`) {
      consecutiveItems++;
    } else {
      break;
    }
  }

  return (
    <List as={type === 'numbered' ? 'ol' : 'ul'} type={type}>
      {blocks.slice(startIndex, startIndex + consecutiveItems).map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </List>
  );
};

const BlockRenderer: React.FC<{
  block: NotionBlock;
  onFocus?: () => void;
  index: number;
}> = React.memo(({ block, onFocus, index }) => {
  const handleKeyDown = useCallback(() => {
    onFocus?.();
  }, [onFocus]);

  const ref = useKeyboardNavigation<HTMLDivElement>({
    onEnter: handleKeyDown,
  });

  switch (block.type) {
    case 'paragraph':
      return (
        <Paragraph ref={ref} tabIndex={0} role="article" aria-label="Paragraph">
          {block.paragraph?.rich_text && (
            <MemoizedRichText richText={block.paragraph.rich_text} />
          )}
        </Paragraph>
      );
    case 'heading_1':
      return (
        <Heading1 ref={ref} tabIndex={0} role="heading" aria-level={1}>
          {block.heading_1?.rich_text && (
            <MemoizedRichText richText={block.heading_1.rich_text} />
          )}
        </Heading1>
      );
    case 'heading_2':
      return (
        <Heading2 ref={ref} tabIndex={0} role="heading" aria-level={2}>
          {block.heading_2?.rich_text && (
            <MemoizedRichText richText={block.heading_2.rich_text} />
          )}
        </Heading2>
      );
    case 'heading_3':
      return (
        <Heading3 ref={ref} tabIndex={0} role="heading" aria-level={3}>
          {block.heading_3?.rich_text && (
            <MemoizedRichText richText={block.heading_3.rich_text} />
          )}
        </Heading3>
      );
    case 'bulleted_list_item':
      return (
        <ListItem ref={ref} tabIndex={0} role="listitem">
          {block.bulleted_list_item?.rich_text && (
            <MemoizedRichText richText={block.bulleted_list_item.rich_text} />
          )}
        </ListItem>
      );
    case 'numbered_list_item':
      return (
        <ListItem ref={ref} tabIndex={0} role="listitem">
          {block.numbered_list_item?.rich_text && (
            <MemoizedRichText richText={block.numbered_list_item.rich_text} />
          )}
        </ListItem>
      );
    case 'code':
      return (
        <div
          ref={ref}
          tabIndex={0}
          role="region"
          aria-label={`Code block in ${block.code?.language || 'plaintext'}`}
        >
          <CodeBlock
            code={
              block.code?.rich_text.map((text) => text.plain_text).join('') ||
              ''
            }
            language={block.code?.language || 'plaintext'}
            caption={block.code?.caption}
          />
        </div>
      );
    case 'image':
      const imageUrl =
        block.image?.type === 'file'
          ? block.image.file?.url
          : block.image?.external?.url;

      return imageUrl ? (
        <div
          ref={ref}
          tabIndex={0}
          role="figure"
          aria-label={
            block.image?.caption?.map((text) => text.plain_text).join('') ||
            'Image'
          }
        >
          <MemoizedImage
            src={imageUrl}
            alt={
              block.image?.caption?.map((text) => text.plain_text).join('') ||
              ''
            }
            caption={block.image?.caption}
            priority={index < 3}
          />
        </div>
      ) : null;
    case 'bookmark':
      return (
        <div
          ref={ref}
          tabIndex={0}
          role="link"
          aria-label={`Bookmark: ${block.bookmark?.url || ''}`}
        >
          <MemoizedBookmark
            url={block.bookmark?.url || ''}
            caption={block.bookmark?.caption}
          />
        </div>
      );
    default:
      return null;
  }
});

BlockRenderer.displayName = 'BlockRenderer';

export const Renderer: React.FC<{
  isDarkMode?: boolean;
  onBlockFocus?: (index: number) => void;
}> = React.memo(({ isDarkMode = false, onBlockFocus }) => {
  const [blocks, setBlocks] = useState<NotionBlock[]>([]);
  const theme = isDarkMode ? darkTheme : lightTheme;
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  useEffect(() => {
    const fetchBlocks = async () => {
      const result = await notion.getPageBlocks();
      setBlocks(result);
    };

    fetchBlocks();
  }, []);

  const handleBlockFocus = useCallback(
    (index: number) => {
      setFocusedIndex(index);
      onBlockFocus?.(index);
    },
    [onBlockFocus]
  );

  const renderedBlocks = useMemo(() => {
    const result: JSX.Element[] = [];

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];

      if (
        block.type === 'bulleted_list_item' &&
        (i === 0 || blocks[i - 1].type !== 'bulleted_list_item')
      ) {
        result.push(
          <List
            as="ul"
            type="bulleted"
            role="list"
            aria-label="Bulleted list"
            key={block.id}
          >
            <ListBlocksRenderer
              blocks={blocks}
              startIndex={i}
              type="bulleted"
            />
          </List>
        );
        while (
          i + 1 < blocks.length &&
          blocks[i + 1].type === 'bulleted_list_item'
        ) {
          i++;
        }
      } else if (
        block.type === 'numbered_list_item' &&
        (i === 0 || blocks[i - 1].type !== 'numbered_list_item')
      ) {
        result.push(
          <List
            as="ol"
            type="numbered"
            role="list"
            aria-label="Numbered list"
            key={block.id}
          >
            <ListBlocksRenderer
              blocks={blocks}
              startIndex={i}
              type="numbered"
            />
          </List>
        );
        while (
          i + 1 < blocks.length &&
          blocks[i + 1].type === 'numbered_list_item'
        ) {
          i++;
        }
      } else if (
        block.type !== 'bulleted_list_item' &&
        block.type !== 'numbered_list_item'
      ) {
        result.push(
          <BlockRenderer
            key={block.id}
            block={block}
            index={i}
            onFocus={() => handleBlockFocus(i)}
          />
        );
      }
    }

    return result;
  }, [blocks, handleBlockFocus]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container role="main" aria-label="Notion page content">
        {renderedBlocks}
      </Container>
    </ThemeProvider>
  );
});

Renderer.displayName = 'Renderer';
