import { memo } from 'react';
import type { RichTextItem } from 'notion-types';
import RichText, { type RichTextProps } from './RichText/RichTexts';
import { Image, ImageProps } from './Image';
import Bookmark, { type BookmarkProps } from './Bookmark/Bookmark';

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
      item.annotations?.strikethrough === next[i]?.annotations?.strikethrough &&
      item.annotations?.underline === next[i]?.annotations?.underline &&
      item.annotations?.code === next[i]?.annotations?.code &&
      item.annotations?.color === next[i]?.annotations?.color
  );
};

export const MemoizedRichText = memo<RichTextProps>(RichText, (prev, next) => {
  return areRichTextsEqual(prev.richTexts, next.richTexts);
});

export const MemoizedImage = memo<ImageProps>(Image, (prev, next) => {
  if (prev.isColumn !== next.isColumn) return false;

  const prevImg = prev.image;
  const nextImg = next.image;
  return (
    prevImg.file?.url === nextImg.file?.url &&
    prevImg.external?.url === nextImg.external?.url &&
    prevImg.format?.block_width === nextImg.format?.block_width &&
    prevImg.format?.block_height === nextImg.format?.block_height &&
    prevImg.format?.block_aspect_ratio === nextImg.format?.block_aspect_ratio &&
    areRichTextsEqual(prevImg.caption, nextImg.caption)
  );
});

// bookmark 객체의 url과 metadata를 비교하여 OG 데이터 변경도 감지
export const MemoizedBookmark = memo<BookmarkProps>(Bookmark, (prev, next) => {
  const prevBm = prev.bookmark;
  const nextBm = next.bookmark;
  return (
    prevBm.url === nextBm.url &&
    prevBm.metadata?.title === nextBm.metadata?.title &&
    prevBm.metadata?.description === nextBm.metadata?.description &&
    prevBm.metadata?.image === nextBm.metadata?.image
  );
});

export const MemoizedLinkPreview = memo<LinkPreviewProps>(
  LinkPreview,
  (prev, next) => {
    return prev.url === next.url;
  }
);
