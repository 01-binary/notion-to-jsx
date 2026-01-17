import React, { memo } from 'react';
import { List, ListItem } from './List';

import { MemoizedRichText } from '../MemoizedComponents';
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

  const renderedChildren: JSX.Element[] = [];
  const children: NotionBlock[] = block.children ?? [];

  if (children.length > 0) {
    let i = 0;
    while (i < children.length) {
      const currentChild = children[i];
      if (!currentChild) {
        i++;
        continue;
      }

      if (
        currentChild.type === 'bulleted_list_item' ||
        currentChild.type === 'numbered_list_item'
      ) {
        const groupType = currentChild.type;
        const currentGroup: (BulletedListItemBlock | NumberedListItemBlock)[] =
          [currentChild as BulletedListItemBlock | NumberedListItemBlock];
        let j = i + 1;
        while (j < children.length) {
          const nextChildInGroup = children[j];
          if (!nextChildInGroup) {
            // 타입스크립트 만족용 null 체크
            break;
          }
          if (nextChildInGroup.type === groupType) {
            currentGroup.push(
              nextChildInGroup as BulletedListItemBlock | NumberedListItemBlock
            );
            j++;
          } else {
            break; // 다른 타입 만나면 그룹 종료
          }
        }
        renderedChildren.push(
          <ListGroup
            key={`${currentChild.id}-group`}
            blocks={currentGroup}
            type={groupType} // 그룹의 실제 타입 전달
            renderBlock={renderBlock}
          />
        );
        i = j; // 다음 순회 시작 위치 업데이트
      } else {
        // 리스트 아이템이 아닌 블록은 renderBlock으로 직접 렌더링
        renderedChildren.push(
          <div key={currentChild.id}>{renderBlock(currentChild, block.id)}</div>
        );
        i++; // 다음 자식으로 이동
      }
    }
  }

  return (
    <ListItem>
      <MemoizedRichText richTexts={richTexts} />
      {renderedChildren.length > 0 && renderedChildren}
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
