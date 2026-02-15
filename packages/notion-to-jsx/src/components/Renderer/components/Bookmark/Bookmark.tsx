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
import { OpenGraphData } from './type';
import ExternalLink from '../shared/ExternalLink';

export interface BookmarkProps {
  url: string;
  metadata?: OpenGraphData;
}

const Bookmark = ({ url, metadata }: BookmarkProps) => {
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
