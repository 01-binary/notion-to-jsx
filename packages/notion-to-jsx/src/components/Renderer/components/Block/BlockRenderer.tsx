import React from 'react';

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

export interface Props {
  block: any;
  onFocus?: () => void;
  index: number;
}

const BlockRenderer: React.FC<Props> = ({ block, onFocus, index }) => {
  if (!block) return null;

  const blockProps = {
    tabIndex: 0,
    onFocus,
    'data-block-id': block.id,
  };

  switch (block.type) {
    case 'link_preview':
      return (
        <MemoizedLinkPreview url={block.link_preview.url} {...blockProps} />
      );
    case 'paragraph':
      return (
        <Paragraph {...blockProps}>
          <MemoizedRichText richTexts={block.paragraph.rich_text} />
        </Paragraph>
      );

    case 'heading_1':
      return (
        <Heading1 {...blockProps}>
          <MemoizedRichText richTexts={block.heading_1.rich_text} />
        </Heading1>
      );

    case 'heading_2':
      return (
        <Heading2 {...blockProps}>
          <MemoizedRichText richTexts={block.heading_2.rich_text} />
        </Heading2>
      );

    case 'heading_3':
      return (
        <Heading3 {...blockProps}>
          <MemoizedRichText richTexts={block.heading_3.rich_text} />
        </Heading3>
      );

    case 'code':
      return (
        <div {...blockProps}>
          <CodeBlock
            code={block.code.rich_text[0].text.content}
            language={block.code.language}
            caption={block.code.caption?.[0]?.plain_text}
          />
        </div>
      );

    case 'image':
      return (
        <figure {...blockProps}>
          <MemoizedImage
            src={block.image.file?.url || block.image.external?.url}
            alt={block.image.caption?.[0]?.plain_text || ''}
            caption={block.image.caption}
            format={block.image.format}
          />
        </figure>
      );

    case 'bookmark':
      return <MemoizedBookmark url={block.bookmark.url} />;

    case 'column_list':
      return <ColumnList block={block} onFocus={onFocus} />;

    case 'column':
      // 개별 column은 ColumnList에서 처리됩니다
      return null;

    case 'quote':
      return <Quote richText={block.quote.rich_text} {...blockProps} />;

    default:
      console.log(`지원되지 않는 블록 타입: ${block.type}`, block);
      return null;
  }
};

export default BlockRenderer;
