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

export interface Props {
  block: NotionBlock;
  isColumn?: boolean;
}

type BlockType = NotionBlock['type'];
type BlockOfType<T extends BlockType> = Extract<NotionBlock, { type: T }>;

type BlockRendererMap = {
  [K in BlockType]?: (
    block: BlockOfType<K>,
    isColumn: boolean
  ) => ReactElement | null;
};

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

  code: (block) => (
    <div>
      <CodeBlock
        code={block.code.rich_text[0]?.text?.content || ''}
        language={block.code.language}
        caption={block.code.caption}
      />
    </div>
  ),

  image: (block, isColumn) => (
    <figure>
      <MemoizedImage
        src={block.image.file?.url || block.image.external?.url || ''}
        alt={block.image.caption?.[0]?.plain_text || ''}
        caption={block.image.caption}
        format={block.image.format}
        isColumn={isColumn}
      />
    </figure>
  ),

  bookmark: (block) => (
    <MemoizedBookmark
      url={block.bookmark.url}
      metadata={block.bookmark.metadata}
    />
  ),

  column_list: (block) => <ColumnList block={block} />,

  column: () => null,

  quote: (block) => <Quote richTexts={block.quote.rich_text} />,

  table: (block) => <Table block={block} />,

  toggle: (block) => <Toggle block={block} />,

  video: (block) => <Video block={block} />,

  embed: (block) => <Embed block={block} />,
};

const BlockRenderer = memo(({ block, isColumn = false }: Props) => {
  if (!block) return null;

  const renderer = blockRenderers[block.type] as
    | ((block: NotionBlock, isColumn: boolean) => ReactElement | null)
    | undefined;
  return renderer ? renderer(block, isColumn) : null;
});

BlockRenderer.displayName = 'BlockRenderer';

export default BlockRenderer;
