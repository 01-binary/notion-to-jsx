import React from 'react';
import { List, ListItem } from './List';
import { MemoizedRichText } from '../MemoizedComponents';
import {
  BulletedListItemBlock,
  NumberedListItemBlock,
} from '../../../../types';

interface RecursiveListItemProps {
  block: BulletedListItemBlock | NumberedListItemBlock;
}
// 리스트 아이템을 렌더링하는 컴포넌트 (중첩 리스트 지원)
const RecursiveListItem = ({ block }: RecursiveListItemProps) => {
  const blockType = block.type;
  let content;

  if (blockType === 'bulleted_list_item') {
    content = block.bulleted_list_item;
  } else {
    content = block.numbered_list_item;
  }

  const richTexts = content.rich_text;

  // 자식 블록들을 필터링하여 현재 리스트 타입(bulleted 또는 numbered)과 일치하는 블록만 선택
  const filteredChildren = block.children?.filter(
    (child): child is BulletedListItemBlock | NumberedListItemBlock =>
      child.type === blockType
  );

  return (
    <ListItem>
      <MemoizedRichText richTexts={richTexts} />
      {filteredChildren && filteredChildren.length > 0 && (
        <RecursiveListGroup blocks={filteredChildren} type={blockType} />
      )}
    </ListItem>
  );
};

interface RecursiveListGroupProps {
  blocks: (BulletedListItemBlock | NumberedListItemBlock)[];
  type: 'bulleted_list_item' | 'numbered_list_item';
}
// 중첩 리스트 그룹을 렌더링하는 컴포넌트
const RecursiveListGroup = ({ blocks, type }: RecursiveListGroupProps) => {
  if (!blocks || blocks.length === 0) return null;

  return (
    <List
      as={type === 'numbered_list_item' ? 'ol' : 'ul'}
      type={type}
      role="list"
      aria-label={type}
    >
      {blocks.map((block) => (
        <RecursiveListItem key={block.id} block={block} />
      ))}
    </List>
  );
};

export interface ListBlocksRendererProps {
  blocks: (BulletedListItemBlock | NumberedListItemBlock)[];
  startIndex: number;
  type: (BulletedListItemBlock | NumberedListItemBlock)['type'];
}

const ListBlocksRenderer = ({
  blocks,
  startIndex,
  type,
}: ListBlocksRendererProps) => {
  let consecutiveItems = 0;
  for (let i = startIndex; i < blocks.length; i++) {
    const block = blocks[i];
    if (!block) break;
    if (block.type === type) {
      consecutiveItems++;
    } else {
      break;
    }
  }

  const listItems = blocks.slice(startIndex, startIndex + consecutiveItems);

  return (
    <List
      as={type === 'numbered_list_item' ? 'ol' : 'ul'}
      type={type}
      role="list"
      aria-label={type}
    >
      {listItems.map((block) => (
        <RecursiveListItem key={block.id} block={block} />
      ))}
    </List>
  );
};

export default ListBlocksRenderer;
