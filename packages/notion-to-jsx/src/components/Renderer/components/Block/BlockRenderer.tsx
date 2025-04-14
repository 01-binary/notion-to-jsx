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
import Table from '../Table';
import { Toggle } from '../Toggle';

export interface Props {
  block: any;
  onFocus?: () => void;
  index: number;
  isColumn?: boolean;
}

const BlockRenderer: React.FC<Props> = ({
  block,
  onFocus,
  index,
  isColumn = false,
}) => {
  if (!block) return null;

  const blockProps = {
    tabIndex: 0,
    onFocus,
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
      return <ColumnList block={block} onFocus={onFocus} />;

    case 'column':
      // 개별 column은 ColumnList에서 처리됩니다
      return null;

    case 'quote':
      return <Quote richTexts={block.quote.rich_text} {...blockProps} />;

    case 'table':
      return <Table block={block} tabIndex={blockProps.tabIndex} />;

    case 'toggle':
      return (
        <Toggle
          block={block}
          tabIndex={blockProps.tabIndex}
          onFocus={onFocus}
        />
      );

    default:
      return null;
  }
};

export default BlockRenderer;
