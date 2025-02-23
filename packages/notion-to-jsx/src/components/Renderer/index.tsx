// import { Client } from 'notion-to-utils';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { container } from './styles.css';

import { NotionBlock } from '../../types';
import testData from '../../constants/test.json';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';
import { darkTheme, lightTheme } from '../../styles/theme.css';
import { List } from './components/List';
// import { BlockRenderer } from './components/Block';
// import { List, ListBlocksRenderer } from './components/List';

const notion = {
  getPageBlocks: async () => {
    return testData as NotionBlock[];
  },
};

// const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
//   body {
//     background-color: ${({ theme }) => theme.colors.background};
//     color: ${({ theme }) => theme.colors.text};
//     font-family: ${({ theme }) => theme.typography.fontFamily.base};
//     line-height: ${({ theme }) => theme.typography.lineHeight.base};
//     margin: 0;
//     padding: 0;
//   }
// `;

interface Props {
  isDarkMode?: boolean;
  onBlockFocus?: (index: number) => void;
}
export const Renderer: React.FC<Props> = React.memo(
  ({ isDarkMode = false, onBlockFocus }) => {
    const [blocks, setBlocks] = useState<NotionBlock[]>([]);
    const theme = isDarkMode ? darkTheme : lightTheme;
    const [focusedIndex, setFocusedIndex] = useState<number>(-1);

    // For test
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

        if (
          block.type === 'bulleted_list_item' &&
          (i === 0 || blocks[i - 1]?.type !== 'bulleted_list_item')
        ) {
          result.push(
            <List
              as="ul"
              type="bulleted"
              role="list"
              aria-label="Bulleted list"
              key={block.id}
            >
              {/* <ListBlocksRenderer
                blocks={blocks}
                startIndex={i}
                type="bulleted"
              /> */}
            </List>
          );
          while (
            i + 1 < blocks.length &&
            blocks[i + 1] &&
            blocks[i + 1]?.type === 'bulleted_list_item'
          ) {
            i++;
          }
        } else if (
          block.type === 'numbered_list_item' &&
          (i === 0 || blocks[i - 1]?.type !== 'numbered_list_item')
        ) {
          result.push(
            <List
              as="ol"
              type="1"
              role="list"
              aria-label="Numbered list"
              key={block.id}
            >
              {/* <ListBlocksRenderer
                  blocks={blocks}
                  startIndex={i}
                  type="numbered"
                /> */}
            </List>
          );
          while (
            i + 1 < blocks.length &&
            blocks[i + 1] &&
            blocks[i + 1]?.type === 'numbered_list_item'
          ) {
            i++;
          }
        } else if (
          block.type !== 'bulleted_list_item' &&
          block.type !== 'numbered_list_item'
        ) {
          result
            .push
            // <BlockRenderer
            //   key={block.id}
            //   block={block}
            //   index={i}
            //   onFocus={() => handleBlockFocus(i)}
            // />
            ();
        }
      }

      return result;
    }, [blocks, handleBlockFocus]);

    return (
      <div className={container} role="main" aria-label="Notion page content">
        {renderedBlocks}
      </div>
    );
  }
);

Renderer.displayName = 'Renderer';
