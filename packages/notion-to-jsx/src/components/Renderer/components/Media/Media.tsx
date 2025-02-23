import React from 'react';
import { RichTextItem } from '../../../../types';
import { MemoizedRichText } from '../MemoizedComponents';
import { caption, bookmarkCard, bookmarkLink } from './styles.css';

interface BookmarkProps {
  url: string;
  title: string;
  description?: string;
  caption?: RichTextItem[];
}

export const Bookmark: React.FC<BookmarkProps> = ({
  url,
  title,
  description,
  caption: bookmarkCaption,
}) => {
  return (
    <div className={bookmarkCard}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={bookmarkLink}
      >
        <h4>{title}</h4>
        {description && <p>{description}</p>}
      </a>
      {bookmarkCaption && (
        <figcaption className={caption}>
          <MemoizedRichText richTexts={bookmarkCaption} />
        </figcaption>
      )}
    </div>
  );
};
