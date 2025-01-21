import React from 'react';
import { RichText } from './RichText';
import { Image } from './Image';
import { Bookmark } from './Bookmark';
import { RichTextItem } from '../types';

export const MemoizedRichText = React.memo(RichText, (prev, next) => {
  return JSON.stringify(prev.richText) === JSON.stringify(next.richText);
});

export const MemoizedImage = React.memo(Image, (prev, next) => {
  return (
    prev.src === next.src &&
    prev.alt === next.alt &&
    JSON.stringify(prev.caption) === JSON.stringify(next.caption)
  );
});

export const MemoizedBookmark = React.memo(Bookmark, (prev, next) => {
  return (
    prev.url === next.url &&
    JSON.stringify(prev.caption) === JSON.stringify(next.caption)
  );
});

// 타입 가드 유틸리티
export const isRichTextArray = (value: unknown): value is RichTextItem[] => {
  if (!Array.isArray(value)) return false;
  return value.every((item) => 
    typeof item === 'object' &&
    item !== null &&
    'type' in item &&
    item.type === 'text'
  );
};
