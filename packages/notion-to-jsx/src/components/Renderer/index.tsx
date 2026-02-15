import { useMemo, memo, useCallback, type ReactNode, type ErrorInfo } from 'react';

import { ListGroup } from './components/List';
import { BlockRenderer } from './components/Block';
import BlockErrorBoundary from './components/BlockErrorBoundary';
import Title from '../Title';
import Cover from '../Cover';
import TableOfContents from '../TableOfContents';
import { extractHeadings } from '../../utils/extractHeadings';
import { groupConsecutiveBlocks } from './utils/groupBlocks';

import type { NotionBlock } from '../../types';
import { container, tocWrapper } from './styles.css';
import { darkTheme, lightTheme } from '../../styles/theme.css';

export interface TocStyleOptions {
  top?: string;
  scrollOffset?: number;
}

interface RendererProps {
  blocks: NotionBlock[];
  title?: string;
  cover?: string;
  isDarkMode?: boolean;
  showToc?: boolean;
  tocStyle?: TocStyleOptions;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

const Renderer = memo(
  ({
    blocks,
    isDarkMode = false,
    title,
    cover,
    showToc = true,
    tocStyle,
    fallback,
    onError,
  }: RendererProps) => {
    const theme = isDarkMode ? darkTheme : lightTheme;
    const headings = useMemo(
      () => (showToc ? extractHeadings(blocks) : []),
      [blocks, showToc]
    );

    // useCallback으로 안정적인 참조 유지 - 리스트 리렌더 방지
    const renderBlock = useCallback(
      (childBlock: NotionBlock) => <BlockRenderer block={childBlock} />,
      []
    );

    const renderedBlocks = useMemo(() => {
      return groupConsecutiveBlocks(blocks).map((group) => {
        if (group.kind === 'list') {
          return (
            <BlockErrorBoundary key={group.blocks[0]?.id} fallback={fallback} onError={onError}>
              <ListGroup
                blocks={group.blocks}
                type={group.type}
                renderBlock={renderBlock}
              />
            </BlockErrorBoundary>
          );
        }
        return (
          <BlockErrorBoundary key={group.block.id} fallback={fallback} onError={onError}>
            <BlockRenderer block={group.block} />
          </BlockErrorBoundary>
        );
      });
    }, [blocks, renderBlock, fallback, onError]);

    return (
      <>
        {cover && <Cover src={cover} alt={title || 'Notion page content'} />}
        <article
          className={`${theme} ${container}`}
          aria-label={title || 'Notion page content'}
        >
          {title && <Title title={title} />}
          {renderedBlocks}
        </article>
        {showToc && (
          <div
            className={`${theme} ${tocWrapper}`}
            style={tocStyle?.top ? { top: tocStyle.top } : undefined}
          >
            <TableOfContents headings={headings} scrollOffset={tocStyle?.scrollOffset} />
          </div>
        )}
      </>
    );
  }
);

Renderer.displayName = 'Renderer';

export default Renderer;
