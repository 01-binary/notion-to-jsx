import { describe, it, expect } from 'vitest';
import { groupConsecutiveBlocks } from '../components/Renderer/utils/groupBlocks';
import type { NotionBlock } from '../types';

const makeBlock = (type: string, id: string): NotionBlock =>
  ({ type, id, object: 'block' }) as unknown as NotionBlock;

const bullet = (id: string) => makeBlock('bulleted_list_item', id);
const numbered = (id: string) => makeBlock('numbered_list_item', id);
const paragraph = (id: string) => makeBlock('paragraph', id);

describe('groupConsecutiveBlocks', () => {
  it('returns empty array for empty input', () => {
    expect(groupConsecutiveBlocks([])).toEqual([]);
  });

  it('wraps single non-list block as single', () => {
    const blocks = [paragraph('p1')];
    const result = groupConsecutiveBlocks(blocks);
    expect(result).toHaveLength(1);
    expect(result[0]?.kind).toBe('single');
  });

  it('groups consecutive bulleted list items', () => {
    const blocks = [bullet('b1'), bullet('b2'), bullet('b3')];
    const result = groupConsecutiveBlocks(blocks);
    expect(result).toHaveLength(1);
    expect(result[0]?.kind).toBe('list');
    if (result[0]?.kind === 'list') {
      expect(result[0].blocks).toHaveLength(3);
      expect(result[0].type).toBe('bulleted_list_item');
    }
  });

  it('groups consecutive numbered list items', () => {
    const blocks = [numbered('n1'), numbered('n2')];
    const result = groupConsecutiveBlocks(blocks);
    expect(result).toHaveLength(1);
    if (result[0]?.kind === 'list') {
      expect(result[0].type).toBe('numbered_list_item');
    }
  });

  it('separates different list types', () => {
    const blocks = [bullet('b1'), bullet('b2'), numbered('n1'), numbered('n2')];
    const result = groupConsecutiveBlocks(blocks);
    expect(result).toHaveLength(2);
    expect(result[0]?.kind).toBe('list');
    expect(result[1]?.kind).toBe('list');
    if (result[0]?.kind === 'list' && result[1]?.kind === 'list') {
      expect(result[0].type).toBe('bulleted_list_item');
      expect(result[1].type).toBe('numbered_list_item');
    }
  });

  it('handles mixed blocks and lists', () => {
    const blocks = [
      paragraph('p1'),
      bullet('b1'),
      bullet('b2'),
      paragraph('p2'),
      numbered('n1'),
    ];
    const result = groupConsecutiveBlocks(blocks);
    expect(result).toHaveLength(4);
    expect(result[0]?.kind).toBe('single');
    expect(result[1]?.kind).toBe('list');
    expect(result[2]?.kind).toBe('single');
    expect(result[3]?.kind).toBe('list');
  });

  it('handles single list item as a group of one', () => {
    const blocks = [bullet('b1')];
    const result = groupConsecutiveBlocks(blocks);
    expect(result).toHaveLength(1);
    if (result[0]?.kind === 'list') {
      expect(result[0].blocks).toHaveLength(1);
    }
  });
});
