// import { Client } from 'notion-to-utils';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { container } from './styles.css';

import { NotionBlock } from '../../types';
import testData from '../../constants/test.json';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';
import { List, ListBlocksRenderer } from './components/List';
import { BlockRenderer } from './components/Block';
import '../../styles/reset.css';
import { darkTheme, lightTheme } from '../../styles/theme.css';

const notion = {
  getPageBlocks: async () => {
    return testData as NotionBlock[];
  },
};

interface Props {
  isDarkMode?: boolean;
  onBlockFocus?: (index: number) => void;
}
export const Renderer: React.FC<Props> = React.memo(
  ({ isDarkMode = false, onBlockFocus }) => {
    const [blocks, setBlocks] = useState<NotionBlock[]>([]);
    const theme = isDarkMode ? darkTheme : lightTheme;
    const [focusedIndex, setFocusedIndex] = useState<number>(-1);

    // TODO: For test
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
        if (!block) break;

        // 리스트 아이템 타입 처리를 위한 공통 함수
        const handleListItem = (listType: 'bulleted' | 'numbered') => {
          const listItemType = `${listType}_list_item`;

          if (
            block.type === listItemType &&
            (i === 0 || blocks[i - 1]?.type !== listItemType)
          ) {
            result.push(
              <ListBlocksRenderer
                key={block.id}
                blocks={blocks}
                startIndex={i}
                type={listType}
              />
            );

            // 연속된 같은 타입의 리스트 아이템 건너뛰기
            while (
              i + 1 < blocks.length &&
              blocks[i + 1] &&
              blocks[i + 1]?.type === listItemType
            ) {
              i++;
            }

            return true;
          }

          return false;
        };

        // 순서대로 각 리스트 타입 처리 시도
        if (handleListItem('bulleted') || handleListItem('numbered')) {
          // 리스트 아이템이 처리되었으므로 다음 블록으로 진행
          continue;
        } else {
          // 리스트 아이템이 아닌 일반 블록 처리
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
      <article
        className={`${theme} ${container}`}
        aria-label="Notion page content"
      >
        {renderedBlocks}
      </article>
    );
  }
);

Renderer.displayName = 'Renderer';
