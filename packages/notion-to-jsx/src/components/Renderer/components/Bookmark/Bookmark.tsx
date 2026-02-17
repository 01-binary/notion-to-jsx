import { useState } from 'react';
import {
  link,
  card,
  content,
  previewContainer,
  previewImage,
  title,
  description,
  siteName,
  favicon,
  urlText,
} from './styles.css';
import type { BookmarkBlock } from 'notion-types';
import ExternalLink from '../shared/ExternalLink';

type BookmarkData = BookmarkBlock['bookmark'];

export interface BookmarkProps {
  bookmark: BookmarkData;
}

const Bookmark = ({ bookmark }: BookmarkProps) => {
  const { url, metadata } = bookmark;
  const [isImageBroken, setIsImageBroken] = useState(false);

  return (
    <ExternalLink href={url} className={link}>
      <div className={card}>
        <div className={content}>
          <div>
            <h4 className={title}>{metadata?.title || url}</h4>
            <p className={description}>{metadata?.description || ''}</p>
          </div>
          <div className={siteName}>
            {metadata?.favicon && (
              <img src={metadata.favicon} alt="" className={favicon} />
            )}
            <span className={urlText}>{metadata?.url || ''}</span>
          </div>
        </div>
        {metadata?.image && !isImageBroken && (
          <div className={previewContainer}>
            <img
              className={previewImage}
              src={metadata.image}
              alt={metadata.title}
              loading="lazy"
              onError={() => setIsImageBroken(true)}
            />
          </div>
        )}
      </div>
    </ExternalLink>
  );
};

export default Bookmark;
