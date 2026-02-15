import { memo } from 'react';
import { VideoBlock } from '../../../../types';
import { Caption } from '../Caption';
import { mediaContainer } from '../Caption/styles.css';
import { getVideoEmbedUrl } from '../../utils/embedUrlParser';
import { videoPlayer, nativeVideo } from './styles.css';

interface VideoProps {
  block: VideoBlock;
}

const Video = memo(({ block }: VideoProps) => {
  if (block.type !== 'video' || !block.video) {
    return null;
  }

  const { type, external, file, caption } = block.video;

  if (type === 'file' && file?.url) {
    return (
      <div className={mediaContainer}>
        <video className={nativeVideo} controls preload="metadata">
          <source src={file.url} />
        </video>
        <Caption caption={caption} />
      </div>
    );
  }

  if (type === 'external') {
    const videoUrl = getVideoEmbedUrl(external?.url);

    if (!videoUrl) {
      return <p>비디오를 불러올 수 없습니다.</p>;
    }

    return (
      <div className={mediaContainer}>
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
        <Caption caption={caption} />
      </div>
    );
  }

  return <p>비디오를 불러올 수 없습니다.</p>;
});

Video.displayName = 'Video';

export default Video;
