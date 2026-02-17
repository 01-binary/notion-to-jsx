import type {
  NotionBlock,
  Heading1Block,
  Heading2Block,
  Heading3Block,
} from 'notion-types';

export interface HeadingItem {
  id: string;
  text: string;
  level: 1 | 2 | 3;
}

type HeadingBlock = Heading1Block | Heading2Block | Heading3Block;

const headingConfig = {
  heading_1: 1,
  heading_2: 2,
  heading_3: 3,
} as const;

const isHeadingBlock = (block: NotionBlock): block is HeadingBlock => {
  return block.type in headingConfig;
};

const getHeadingContent = (block: HeadingBlock) => {
  switch (block.type) {
    case 'heading_1': return block.heading_1;
    case 'heading_2': return block.heading_2;
    case 'heading_3': return block.heading_3;
  }
};

const extractHeadingData = (block: HeadingBlock) => {
  const level = headingConfig[block.type];
  const content = getHeadingContent(block);
  return {
    text: content.rich_text.map((t) => t.plain_text).join(''),
    level,
  };
};

/**
 * NotionBlock 배열에서 heading 블록들을 추출하여 ToC용 데이터로 변환합니다.
 *
 * @param blocks - NotionBlock 배열
 * @returns HeadingItem 배열 (id, text, level)
 *
 * @example
 * ```tsx
 * const headings = extractHeadings(blocks);
 * // [{ id: 'abc123', text: '소개', level: 1 }, ...]
 * ```
 */
export const extractHeadings = (blocks: NotionBlock[]): HeadingItem[] => {
  return blocks.filter(isHeadingBlock).map((block) => ({
    id: block.id,
    ...extractHeadingData(block),
  }));
};
