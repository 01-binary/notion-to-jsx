import { VideoBlock } from '../../../../types';
import { RichTextItem } from '../RichText/RichTexts'; // Caption을 위해 추가
import { videoContainer, videoPlayer, videoCaption } from './styles.css'; // 스타일 임포트

interface VideoProps {
  block: VideoBlock;
}

const Video = ({ block }: VideoProps) => {
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
};

const getVideoEmbedUrl = (url?: string): string => {
  if (!url) return '';

  // YouTube URL 처리 (일반적인 YouTube URL 및 짧은 URL 지원)
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1]?.split('?')[0];
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  } else if (url.includes('youtube.com/watch?v=')) {
    const videoId = url.split('watch?v=')[1]?.split('&')[0];
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  }
  // 다른 외부 비디오 URL (직접 임베드가 어려울 수 있음)
  return url;
};

export default Video;
