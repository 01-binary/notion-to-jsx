import { memo, ReactElement } from 'react';
import {
  MemoizedRichText,
  MemoizedImage,
  MemoizedBookmark,
  MemoizedLinkPreview,
} from '../MemoizedComponents';
import { CodeBlock } from '../Code';
import { Heading1, Heading2, Heading3, Paragraph } from '../Typography';
import { ColumnList } from '../Column';
import { Quote } from '../Quote';
import Table from '../Table';
import { Toggle } from '../Toggle';
import { Video } from '../Video';
import { Embed } from '../Embed';
import { NotionBlock } from '../../../../types';

export interface BlockRendererProps {
  block: NotionBlock;
  isColumn?: boolean;
}

/** NotionBlock의 모든 type 리터럴 유니온 (e.g. 'paragraph' | 'heading_1' | ...) */
type BlockType = NotionBlock['type'];

/** 특정 BlockType에 해당하는 블록 타입을 추출. Extract로 discriminated union을 좁힘 */
type BlockOfType<T extends BlockType> = Extract<NotionBlock, { type: T }>;

/** 블록 타입별 렌더러 함수 맵. 각 키는 BlockType이고 값은 해당 타입의 블록을 받아 JSX를 반환하는 함수 */
type BlockRendererMap = {
  [K in BlockType]?: (
    block: BlockOfType<K>,
    isColumn: boolean
  ) => ReactElement | null;
};

/**
 * 블록 타입별 렌더러 맵.
 *
 * Props 전달 컨벤션:
 * - children이 있는 블록(Toggle, Table, ColumnList): block 통째 전달 (children 접근 필요)
 * - 텍스트 블록(paragraph, heading): children으로 RichText 전달
 * - 미디어/콘텐츠 블록: block.[type] 콘텐츠 객체를 전달 (컴포넌트가 내부 구조 처리)
 */
const blockRenderers: BlockRendererMap = {
  link_preview: (block) => <MemoizedLinkPreview url={block.link_preview.url} />,

  paragraph: (block) => (
    <Paragraph>
      <MemoizedRichText richTexts={block.paragraph.rich_text} />
    </Paragraph>
  ),

  heading_1: (block) => (
    <Heading1 blockId={block.id}>
      <MemoizedRichText richTexts={block.heading_1.rich_text} />
    </Heading1>
  ),

  heading_2: (block) => (
    <Heading2 blockId={block.id}>
      <MemoizedRichText richTexts={block.heading_2.rich_text} />
    </Heading2>
  ),

  heading_3: (block) => (
    <Heading3 blockId={block.id}>
      <MemoizedRichText richTexts={block.heading_3.rich_text} />
    </Heading3>
  ),

  code: (block) => <CodeBlock code={block.code} />,

  image: (block, isColumn) => (
    <figure>
      <MemoizedImage image={block.image} isColumn={isColumn} />
    </figure>
  ),

  bookmark: (block) => <MemoizedBookmark bookmark={block.bookmark} />,

  column_list: (block) => <ColumnList block={block} />,

  column: () => null,

  quote: (block) => <Quote quote={block.quote} />,

  table: (block) => <Table block={block} />,

  toggle: (block) => <Toggle block={block} />,

  video: (block) => <Video video={block.video} />,

  embed: (block) => <Embed embed={block.embed} />,
};

const BlockRenderer = memo(({ block, isColumn = false }: BlockRendererProps) => {
  if (!block) return null;

  // blockRenderers[block.type]의 반환 타입은 BlockRendererMap의 각 키별 함수이지만,
  // TypeScript는 동적 키 접근 시 유니온의 개별 타입으로 좁히지 못해 as 단언이 필요
  const renderer = blockRenderers[block.type] as
    | ((block: NotionBlock, isColumn: boolean) => ReactElement | null)
    | undefined;
  return renderer ? renderer(block, isColumn) : null;
});

BlockRenderer.displayName = 'BlockRenderer';

export default BlockRenderer;
