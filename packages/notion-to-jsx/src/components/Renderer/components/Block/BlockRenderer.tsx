import React from 'react';

import {
  MemoizedRichText,
  MemoizedImage,
  MemoizedBookmark,
} from '../../../MemoizedComponents';
import { CodeBlock } from '../Code';
import { Heading1, Heading2, Heading3, Paragraph } from '../Typography';
import { BookmarkCard, BookmarkLink, ImageWrapper } from '../Media';

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

    case 'bulleted_list_item':
      return (
        <div {...blockProps}>
          <MemoizedRichText richTexts={block.bulleted_list_item.rich_text} />
        </div>
      );

    case 'numbered_list_item':
      return (
        <div {...blockProps}>
          <MemoizedRichText richTexts={block.numbered_list_item.rich_text} />
        </div>
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
        <ImageWrapper {...blockProps}>
          <MemoizedImage
            src={block.image.file?.url || block.image.external?.url}
            alt={block.image.caption?.[0]?.plain_text || ''}
          />
          {block.image.caption && (
            <figcaption>
              <MemoizedRichText richTexts={block.image.caption} />
            </figcaption>
          )}
        </ImageWrapper>
      );

    case 'bookmark':
      return (
        <BookmarkCard {...blockProps}>
          <BookmarkLink
            href={block.bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MemoizedBookmark url={block.bookmark.url} />
          </BookmarkLink>
        </BookmarkCard>
      );

    default:
      return null;
  }
};

export default BlockRenderer;
