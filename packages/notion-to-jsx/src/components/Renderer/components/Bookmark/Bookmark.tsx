import React, { useState, useEffect } from 'react';
import { MemoizedRichText } from '../MemoizedComponents';
import {
  link,
  card,
  content,
  previewImage,
  title,
  description,
  siteName,
  caption,
} from './styles.css';
import { RichTextItem } from '../RichText/RichTexts';

interface OpenGraphData {
  title: string;
  description: string;
  image: string;
  siteName: string;
}

export interface BookmarkProps {
  url: string;
  caption?: RichTextItem[];
}

// 실제 프로덕션에서는 서버 사이드에서 처리하거나 전용 API를 사용해야 합니다
const fetchOpenGraphData = async (url: string): Promise<OpenGraphData> => {
  try {
    const parsedUrl = new URL(url);
    const domain = parsedUrl.hostname;
    const siteName = domain.split('.')[1] || domain;

    // 임시로 더미 데이터를 반환
    return {
      title: domain,
      description: 'No description available',
      image: '',
      siteName: siteName,
    };
  } catch {
    return {
      title: url,
      description: 'Invalid URL',
      image: '',
      siteName: 'Unknown',
    };
  }
};

const Bookmark: React.FC<BookmarkProps> = ({ url, caption }) => {
  const [ogData, setOgData] = useState<OpenGraphData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadOgData = async () => {
      try {
        const data = await fetchOpenGraphData(url);
        setOgData(data);
      } catch (err) {
        setError(true);
      }
    };

    loadOgData();
  }, [url]);

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={link}>
      <div className={card}>
        {ogData?.image && (
          <img
            className={previewImage}
            src={ogData.image}
            alt={ogData.title}
            loading="lazy"
          />
        )}
        <div className={content}>
          <h4 className={title}>{ogData?.title || url}</h4>
          {ogData?.description && (
            <p className={description}>{ogData.description}</p>
          )}
          {ogData?.siteName && (
            <div className={siteName}>{ogData.siteName}</div>
          )}
          {/* {caption && caption.length > 0 && (
            <div className={caption}>
              <MemoizedRichText richTexts={caption} />
            </div>
          )} */}
        </div>
      </div>
    </a>
  );
};

export default Bookmark;
