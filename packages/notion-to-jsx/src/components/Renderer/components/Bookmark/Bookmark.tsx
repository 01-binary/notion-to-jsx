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

export interface Props {
  url: string;
  metadata?: OpenGraphData;
}

const Bookmark = ({ url, metadata }: Props) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={link}>
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
        {metadata?.image && (
          <div className={previewContainer}>
            <img
              className={previewImage}
              src={metadata.image}
              alt={metadata.title}
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
