import { memo } from 'react';
import { VideoBlock } from '../../../../types';
import { Caption } from '../Caption';
import { mediaContainer } from '../shared/styles.css';
import ExternalLink from '../shared/ExternalLink';
import { getVideoEmbedUrl } from '../../utils/embedUrlParser';
import { videoPlayer, nativeVideo } from './styles.css';
import { RichTextItem } from '../RichText/RichTexts';

// ============ 서브 컴포넌트 ============

interface NativeVideoProps {
  url: string;
  caption?: RichTextItem[];
}

const NativeVideo = memo(({ url, caption }: NativeVideoProps) => (
  <div className={mediaContainer}>
    <video className={nativeVideo} controls preload="metadata">
      <source src={url} />
      <track kind="captions" />
    </video>
    <Caption caption={caption} />
  </div>
));

NativeVideo.displayName = 'NativeVideo';

interface YouTubeEmbedProps {
  url: string;
  caption?: RichTextItem[];
}

const YouTubeEmbed = memo(({ url, caption }: YouTubeEmbedProps) => (
  <div className={mediaContainer}>
    <iframe
      className={videoPlayer}
      src={url}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
    <Caption caption={caption} />
  </div>
));

YouTubeEmbed.displayName = 'YouTubeEmbed';

interface ExternalVideoLinkProps {
  url: string;
  caption?: RichTextItem[];
}

const ExternalVideoLink = memo(({ url, caption }: ExternalVideoLinkProps) => (
  <div className={mediaContainer}>
    <p>
      External video link:{' '}
      <ExternalLink href={url}>{url}</ExternalLink>
    </p>
    <Caption caption={caption} />
  </div>
));

ExternalVideoLink.displayName = 'ExternalVideoLink';

// ============ 메인 컴포넌트 ============

export type VideoData = VideoBlock['video'];

interface VideoProps {
  video: VideoData;
}

const Video = memo(({ video }: VideoProps) => {
  const { type, external, file, caption } = video;

  if (type === 'file' && file?.url) {
    return <NativeVideo url={file.url} caption={caption} />;
  }

  if (type === 'external') {
    const videoUrl = getVideoEmbedUrl(external?.url);

    if (!videoUrl) {
      return <p>Unable to load video.</p>;
    }

    if (videoUrl.includes('youtube.com/embed/')) {
      return <YouTubeEmbed url={videoUrl} caption={caption} />;
    }

    return <ExternalVideoLink url={videoUrl} caption={caption} />;
  }

  return <p>Unable to load video.</p>;
});

Video.displayName = 'Video';

export default Video;
