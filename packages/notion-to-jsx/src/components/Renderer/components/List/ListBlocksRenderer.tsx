import React from 'react';
import { List, ListItem } from './List';
import { MemoizedRichText } from '../MemoizedComponents';

export interface Props {
  blocks: any[];
  startIndex: number;
  type: 'bulleted' | 'numbered';
}

// 리스트 아이템을 렌더링하는 컴포넌트 (중첩 리스트 지원)
const RecursiveListItem: React.FC<{
  block: any;
  index: number;
}> = ({ block, index }) => {
  const blockProps = {
    tabIndex: 0,
    'data-block-id': block.id,
  };

  const blockType = block.type;
  const richTexts = block[blockType]?.rich_text;

  return (
    <ListItem {...blockProps}>
      <MemoizedRichText richTexts={richTexts} />
      {block.children && block.children.length > 0 && (
        <RecursiveListGroup
          blocks={block.children}
          type={blockType.split('_')[0] as 'bulleted' | 'numbered'}
        />
      )}
    </ListItem>
  );
};

// 중첩 리스트 그룹을 렌더링하는 컴포넌트
const RecursiveListGroup: React.FC<{
  blocks: any[];
  type: 'bulleted' | 'numbered';
}> = ({ blocks, type }) => {
  if (!blocks || blocks.length === 0) return null;

  // 리스트 타입에 맞는 아이템만 필터링
  const listItems = blocks.filter(
    (block) => block.type === `${type}_list_item`
  );

  if (listItems.length === 0) return null;

  return (
    <List
      as={type === 'numbered' ? 'ol' : 'ul'}
      type={type}
      role="list"
      aria-label={type === 'bulleted' ? 'Bulleted list' : 'Numbered list'}
    >
      {listItems.map((block, index) => (
        <RecursiveListItem key={block.id} block={block} index={index} />
      ))}
    </List>
  );
};

const ListBlocksRenderer: React.FC<Props> = ({ blocks, startIndex, type }) => {
  let consecutiveItems = 0;
  for (let i = startIndex; i < blocks.length; i++) {
    const block = blocks[i];
    if (!block) break;
    if (block.type === `${type}_list_item`) {
      consecutiveItems++;
    } else {
      break;
    }
  }

  const listItems = blocks.slice(startIndex, startIndex + consecutiveItems);

  return (
    <List
      as={type === 'numbered' ? 'ol' : 'ul'}
      type={type}
      role="list"
      aria-label={type === 'bulleted' ? 'Bulleted list' : 'Numbered list'}
    >
      {listItems.map((block, index) => (
        <RecursiveListItem
          key={block.id}
          block={block}
          index={startIndex + index}
        />
      ))}
    </List>
  );
};

export default ListBlocksRenderer;
