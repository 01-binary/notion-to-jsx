import { memo } from 'react';
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
import { NotionBlock } from '../../../../types';

export interface Props {
  block: NotionBlock;
  isColumn?: boolean;
}

const BlockRenderer = memo(({ block, isColumn = false }: Props) => {
  if (!block) return null;

  switch (block.type) {
    case 'link_preview':
      return <MemoizedLinkPreview url={block.link_preview.url} />;
    case 'paragraph':
      return (
        <Paragraph>
          <MemoizedRichText richTexts={block.paragraph.rich_text} />
        </Paragraph>
      );

    case 'heading_1':
      return (
        <Heading1 blockId={block.id}>
          <MemoizedRichText richTexts={block.heading_1.rich_text} />
        </Heading1>
      );

    case 'heading_2':
      return (
        <Heading2 blockId={block.id}>
          <MemoizedRichText richTexts={block.heading_2.rich_text} />
        </Heading2>
      );

    case 'heading_3':
      return (
        <Heading3 blockId={block.id}>
          <MemoizedRichText richTexts={block.heading_3.rich_text} />
        </Heading3>
      );

    case 'code':
      return (
        <div>
          <CodeBlock
            code={block.code.rich_text[0]?.text?.content || ''}
            language={block.code.language}
            caption={block.code.caption}
          />
        </div>
      );

    case 'image':
      return (
        <figure>
          <MemoizedImage
            src={block.image.file?.url || block.image.external?.url || ''}
            alt={block.image.caption?.[0]?.plain_text || ''}
            caption={block.image.caption}
            format={block.image.format}
            isColumn={isColumn}
          />
        </figure>
      );

    case 'bookmark':
      return (
        <MemoizedBookmark
          url={block.bookmark.url}
          metadata={block.bookmark.metadata}
        />
      );

    case 'column_list':
      return <ColumnList block={block} />;

    case 'column':
      // 개별 column은 ColumnList에서 처리됩니다
      return null;

    case 'quote':
      return <Quote richTexts={block.quote.rich_text} />;

    case 'table':
      return <Table block={block} />;

    case 'toggle':
      return <Toggle block={block} />;

    case 'video':
      return <Video block={block} />;

    default:
      return null;
  }
});

BlockRenderer.displayName = 'BlockRenderer';

export default BlockRenderer;
