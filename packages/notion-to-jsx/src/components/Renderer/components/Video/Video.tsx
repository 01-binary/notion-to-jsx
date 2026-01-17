import { memo } from 'react';
import { VideoBlock } from '../../../../types';
import { RichTextItem } from '../RichText/RichTexts'; // Caption을 위해 추가
import { videoContainer, videoPlayer, videoCaption } from './styles.css'; // 스타일 임포트

interface VideoProps {
  block: VideoBlock;
}

const Video = memo(({ block }: VideoProps) => {
  if (block.type !== 'video' || !block.video) {
    return null;
  }

  const { type, external, caption } = block.video;

  let videoUrl = '';
  // TODO: 'file' 타입 비디오 처리 (Notion 내부 업로드 비디오)
  if (type === 'external') {
    videoUrl = getVideoEmbedUrl(external?.url);
  }

  if (!videoUrl) {
    return <p>비디오를 불러올 수 없습니다.</p>;
  }

  return (
    <div className={videoContainer}>
      {videoUrl.includes('youtube.com/embed/') ? (
        <iframe
          className={videoPlayer}
          src={videoUrl}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <p>
          외부 비디오 링크:{' '}
          <a href={videoUrl} target="_blank" rel="noopener noreferrer">
            {videoUrl}
          </a>
        </p>
      )}
      {caption && caption.length > 0 && (
        <figcaption className={videoCaption}>
          {caption.map((c: RichTextItem, i: number) => (
            <span key={i}>{c.plain_text}</span>
          ))}
        </figcaption>
      )}
    </div>
  );
});

Video.displayName = 'Video';

// 정규식을 모듈 스코프에 정의하여 매번 생성하지 않도록 최적화
const YOUTUBE_SHORT_URL_REGEX = /youtu\.be\/([a-zA-Z0-9_-]+)/;
const YOUTUBE_WATCH_URL_REGEX = /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;

const getVideoEmbedUrl = (url?: string): string => {
  if (!url) return '';

  // YouTube 짧은 URL (youtu.be)
  const shortMatch = url.match(YOUTUBE_SHORT_URL_REGEX);
  if (shortMatch?.[1]) {
    return `https://www.youtube.com/embed/${shortMatch[1]}`;
  }

  // YouTube 일반 URL (youtube.com/watch?v=)
  const watchMatch = url.match(YOUTUBE_WATCH_URL_REGEX);
  if (watchMatch?.[1]) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`;
  }

  // 다른 외부 비디오 URL
  return url;
};

export default Video;
