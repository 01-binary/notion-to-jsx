import { useMemo, memo } from 'react';

import { ListBlocksRenderer } from './components/List';
import { BlockRenderer } from './components/Block';
import Title from '../Title';
import Cover from '../Cover';

import {
  BulletedListItemBlock,
  NotionBlock,
  NumberedListItemBlock,
} from '../../types';
import { container } from './styles.css';
import '../../styles/reset.css';
import { darkTheme, lightTheme } from '../../styles/theme.css';

interface Props {
  blocks: NotionBlock[];
  title?: string;
  cover?: string;
  isDarkMode?: boolean;
}

const Renderer = memo(({ blocks, isDarkMode = false, title, cover }: Props) => {
  const theme = isDarkMode ? darkTheme : lightTheme;

  const renderedBlocks = useMemo(() => {
    const result: JSX.Element[] = [];

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
          result.push(
            <ListBlocksRenderer
              key={block.id}
              blocks={
                blocks as (BulletedListItemBlock | NumberedListItemBlock)[]
              }
              startIndex={i}
              type={listItemType}
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
        result.push(<BlockRenderer key={block.id} block={block} />);
      }
    }

    return result;
  }, [blocks]);

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
