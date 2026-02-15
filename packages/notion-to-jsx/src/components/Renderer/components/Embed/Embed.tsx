import { memo } from 'react';
import { Caption } from '../Caption';
import { mediaContainer } from '../Caption/styles.css';
import {
  getEmbedUrl,
  getEmbedTitle,
  isAllowedEmbedDomain,
} from '../../utils/embedUrlParser';
import { embedIframe } from './styles.css';
import { RichTextItem } from '../RichText/RichTexts';

interface EmbedProps {
  url: string;
  caption?: RichTextItem[];
}

const Embed = memo(({ url, caption }: EmbedProps) => {

  if (!isAllowedEmbedDomain(url)) {
    return (
      <div className={mediaContainer}>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
        <Caption caption={caption} />
      </div>
    );
  }

  const embedUrl = getEmbedUrl(url);
  const title = getEmbedTitle(url);

  return (
    <div className={mediaContainer}>
      <iframe
        className={embedIframe}
        src={embedUrl}
        title={title}
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        allowFullScreen
      />
      <Caption caption={caption} />
    </div>
  );
});

Embed.displayName = 'Embed';

export default Embed;
