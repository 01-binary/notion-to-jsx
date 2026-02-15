import type {
  NotionBlock,
  BulletedListItemBlock,
  NumberedListItemBlock,
} from '../../../types';

type ListItemType = 'bulleted_list_item' | 'numbered_list_item';

export type GroupedBlock =
  | { kind: 'list'; blocks: (BulletedListItemBlock | NumberedListItemBlock)[]; type: ListItemType }
  | { kind: 'single'; block: NotionBlock };

/**
 * 연속된 동일 타입의 리스트 아이템을 그룹으로 묶고, 나머지는 개별 블록으로 반환한다.
 *
 * @example
 * groupConsecutiveBlocks([bullet, bullet, paragraph, numbered])
 * // => [
 * //   { kind: 'list', blocks: [bullet, bullet], type: 'bulleted_list_item' },
 * //   { kind: 'single', block: paragraph },
 * //   { kind: 'list', blocks: [numbered], type: 'numbered_list_item' },
 * // ]
 */
export function groupConsecutiveBlocks(blocks: NotionBlock[]): GroupedBlock[] {
  const groups: GroupedBlock[] = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];
    if (!block) {
      i++;
      continue;
    }

    if (
      block.type === 'bulleted_list_item' ||
      block.type === 'numbered_list_item'
    ) {
      const listType = block.type;
      const listItems: (BulletedListItemBlock | NumberedListItemBlock)[] = [];

      while (i < blocks.length && blocks[i]?.type === listType) {
        listItems.push(blocks[i] as BulletedListItemBlock | NumberedListItemBlock);
        i++;
      }

      groups.push({ kind: 'list', blocks: listItems, type: listType });
    } else {
      groups.push({ kind: 'single', block });
      i++;
    }
  }

  return groups;
}
