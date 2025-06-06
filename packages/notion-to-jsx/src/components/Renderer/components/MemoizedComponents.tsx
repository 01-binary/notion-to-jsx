import { memo } from 'react';
import RichText, { RichTextItem, RichTextProps } from './RichText/RichTexts';
import { Image, ImageProps } from './Image';
import Bookmark, { type Props as BookmarkProps } from './Bookmark/Bookmark';

import LinkPreview, { type LinkPreviewProps } from './LinkPreview/LinkPreview';

export const MemoizedRichText = memo<RichTextProps>(RichText, (prev, next) => {
  return JSON.stringify(prev.richTexts) === JSON.stringify(next.richTexts);
});

export const MemoizedImage = memo<ImageProps>(Image, (prev, next) => {
  return (
    prev.src === next.src &&
    prev.alt === next.alt &&
    JSON.stringify(prev.caption) === JSON.stringify(next.caption)
  );
});

export const MemoizedBookmark = memo<BookmarkProps>(Bookmark, (prev, next) => {
  return prev.url === next.url;
});

export const MemoizedLinkPreview = memo<LinkPreviewProps>(
  LinkPreview,
  (prev, next) => {
    return prev.url === next.url;
  }
);

// 타입 가드 유틸리티
export const isRichTextArray = (value: unknown): value is RichTextItem[] => {
  if (!Array.isArray(value)) return false;
  return value.every(
    (item) =>
      typeof item === 'object' &&
      item !== null &&
      'type' in item &&
      item.type === 'text'
  );
};
