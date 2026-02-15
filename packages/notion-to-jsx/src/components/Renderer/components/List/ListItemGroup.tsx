import React, { memo } from 'react';
import { List, ListItem } from './List';

import { MemoizedRichText } from '../MemoizedComponents';
import { groupConsecutiveBlocks } from '../../utils/groupBlocks';
import {
  BulletedListItemBlock,
  NotionBlock,
  NumberedListItemBlock,
} from '../../../../types';

interface RecursiveListItemProps {
  block: BulletedListItemBlock | NumberedListItemBlock;
  renderBlock: (block: NotionBlock, parentBlockId?: string) => React.ReactNode;
}

// 리스트 아이템을 렌더링하는 컴포넌트 (중첩 리스트 지원)
const RecursiveListItem = memo(({ block, renderBlock }: RecursiveListItemProps) => {
  let content:
    | BulletedListItemBlock['bulleted_list_item']
    | NumberedListItemBlock['numbered_list_item'];

  if (block.type === 'bulleted_list_item') {
    content = block.bulleted_list_item;
  } else {
    // block.type이 'numbered_list_item'이라고 가정 (props 타입에 의해 보장됨)
    content = (block as NumberedListItemBlock).numbered_list_item;
  }

  const richTexts = content.rich_text;
  const children: NotionBlock[] = block.children ?? [];

  const renderedChildren = children.length > 0
    ? groupConsecutiveBlocks(children).map((group) => {
        if (group.kind === 'list') {
          return (
            <ListGroup
              key={`${group.blocks[0]?.id}-group`}
              blocks={group.blocks}
              type={group.type}
              renderBlock={renderBlock}
            />
          );
        }
        return (
          <div key={group.block.id}>
            {renderBlock(group.block, block.id)}
          </div>
        );
      })
    : null;

  return (
    <ListItem>
      <MemoizedRichText richTexts={richTexts} />
      {renderedChildren}
    </ListItem>
  );
});

RecursiveListItem.displayName = 'RecursiveListItem';

interface ListGroupProps {
  blocks: (BulletedListItemBlock | NumberedListItemBlock)[];
  type: 'bulleted_list_item' | 'numbered_list_item';
  renderBlock: (block: NotionBlock, parentBlockId?: string) => React.ReactNode;
}

export const ListGroup = memo(({ blocks, type, renderBlock }: ListGroupProps) => {
  if (blocks.length === 0) return null;

  return (
    <List
      as={type === 'numbered_list_item' ? 'ol' : 'ul'}
      type={type}
      role="list"
      aria-label={type}
    >
      {blocks.map((block) => (
        <RecursiveListItem
          key={block.id}
          block={block}
          renderBlock={renderBlock}
        />
      ))}
    </List>
  );
});

ListGroup.displayName = 'ListGroup';
