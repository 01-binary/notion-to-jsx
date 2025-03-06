import React, { useState, useEffect } from 'react';
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

interface OpenGraphData {
  title: string;
  description: string;
  image: string;
  siteName: string;
  url: string;
  favicon?: string;
}

export interface BookmarkProps {
  url: string;
}

// OpenGraph 데이터를 가져오는 함수
const fetchOpenGraphData = async (url: string): Promise<OpenGraphData> => {
  try {
    const apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Failed to fetch metadata');
    }

    const { status, data: metaData } = data;

    if (status !== 'success') {
      throw new Error('API returned error status');
    }

    const parsedUrl = new URL(url);
    const domain = parsedUrl.hostname;

    return {
      title: metaData.title || domain,
      description: metaData.description || 'No description available',
      image: metaData.image?.url || '',
      siteName: metaData.publisher || domain,
      url: metaData.url || '',
      favicon:
        metaData.logo?.url ||
        `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
    };
  } catch (error) {
    console.error('Error fetching OpenGraph data:', error);

    const parsedUrl = new URL(url);
    const domain = parsedUrl.hostname;

    return {
      title: domain,
      description: 'No description available',
      image: '',
      url: '',
      siteName: domain,
      favicon: `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
    };
  }
};

const Bookmark: React.FC<BookmarkProps> = ({ url }) => {
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
        <div className={content}>
          <div>
            <h4 className={title}>{ogData?.title || url}</h4>
            <p className={description}>{ogData?.description || ''}</p>
          </div>
          <div className={siteName}>
            {ogData?.favicon && (
              <img src={ogData.favicon} alt="" className={favicon} />
            )}
            <span className={urlText}>{ogData?.url || ''}</span>
          </div>
        </div>
        {ogData?.image && (
          <div className={previewContainer}>
            <img
              className={previewImage}
              src={ogData.image}
              alt={ogData.title}
              loading="lazy"
              onError={(e) => {
                // 이미지 로드 실패 시 처리
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        )}
      </div>
    </a>
  );
};

export default Bookmark;
