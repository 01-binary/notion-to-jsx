import { useMemo, memo, useCallback } from 'react';
import type { ReactNode } from 'react';

import { ListGroup } from './components/List';
import { BlockRenderer } from './components/Block';
import Title from '../Title';
import Cover from '../Cover';

import {
  BulletedListItemBlock,
  NotionBlock,
  NumberedListItemBlock,
} from '../../types';
import { container } from './styles.css';
import { darkTheme, lightTheme } from '../../styles/theme.css';

interface Props {
  blocks: NotionBlock[];
  title?: string;
  cover?: string;
  isDarkMode?: boolean;
}

const Renderer = memo(({ blocks, isDarkMode = false, title, cover }: Props) => {
  const theme = isDarkMode ? darkTheme : lightTheme;

  // useCallback으로 안정적인 참조 유지 - 리스트 리렌더 방지
  const renderBlock = useCallback(
    (childBlock: NotionBlock) => <BlockRenderer block={childBlock} />,
    []
  );

  const renderedBlocks = useMemo(() => {
    const result: ReactNode[] = [];

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      if (!block) break;

      // 리스트 아이템 타입 처리를 위한 공통 함수
      const handleListItem = (listType: 'bulleted' | 'numbered') => {
        const listItemType = `${listType}_list_item` as (
          | BulletedListItemBlock
          | NumberedListItemBlock
        )['type'];

        if (
          block.type === listItemType &&
          (i === 0 || blocks[i - 1]?.type !== listItemType)
        ) {
          // 연속된 리스트 아이템 수집
          const listItems: (BulletedListItemBlock | NumberedListItemBlock)[] =
            [];
          let j = i;
          while (
            j < blocks.length &&
            blocks[j] &&
            blocks[j]?.type === listItemType
          ) {
            listItems.push(
              blocks[j] as BulletedListItemBlock | NumberedListItemBlock
            );
            j++;
          }

          result.push(
            <ListGroup
              key={block.id}
              blocks={listItems}
              type={listItemType}
              renderBlock={renderBlock}
            />
          );

          // 이미 처리된 리스트 아이템 건너뛰기 (j는 다음 블록의 인덱스)
          i = j - 1;

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
        result.push(<BlockRenderer key={block.id} block={block} />);
      }
    }

    return result;
  }, [blocks, renderBlock]);

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
    </>
  );
});

Renderer.displayName = 'Renderer';

export default Renderer;
