import { memo } from 'react';
import RichText, { RichTextItem, RichTextProps } from './RichText/RichTexts';
import { Image, ImageProps } from './Image';
import Bookmark, { type Props as BookmarkProps } from './Bookmark/Bookmark';

import LinkPreview, { type LinkPreviewProps } from './LinkPreview/LinkPreview';

/**
 * RichTextItem 배열의 얕은 비교
 * JSON.stringify보다 효율적인 O(n) 비교
 */
const areRichTextsEqual = (
  prev: RichTextItem[] | undefined,
  next: RichTextItem[] | undefined
): boolean => {
  if (prev === next) return true;
  if (!prev || !next) return prev === next;
  if (prev.length !== next.length) return false;

  return prev.every(
    (item, i) =>
      item.plain_text === next[i]?.plain_text &&
      item.href === next[i]?.href &&
      item.annotations?.bold === next[i]?.annotations?.bold &&
      item.annotations?.italic === next[i]?.annotations?.italic &&
      item.annotations?.code === next[i]?.annotations?.code &&
      item.annotations?.color === next[i]?.annotations?.color
  );
};

export const MemoizedRichText = memo<RichTextProps>(RichText, (prev, next) => {
  return areRichTextsEqual(prev.richTexts, next.richTexts);
});

export const MemoizedImage = memo<ImageProps>(Image, (prev, next) => {
  return (
    prev.src === next.src &&
    prev.alt === next.alt &&
    areRichTextsEqual(prev.caption, next.caption)
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
