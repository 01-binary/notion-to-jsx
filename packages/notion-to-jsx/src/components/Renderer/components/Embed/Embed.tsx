import { memo } from 'react';
import { Caption } from '../Caption';
import { mediaContainer } from '../shared/styles.css';
import ExternalLink from '../shared/ExternalLink';
import {
  getEmbedUrl,
  getEmbedTitle,
  isAllowedEmbedDomain,
} from '../../utils/embedUrlParser';
import { embedIframe } from './styles.css';
import type { EmbedBlock } from 'notion-types';

type EmbedData = EmbedBlock['embed'];

interface EmbedProps {
  embed: EmbedData;
}

const Embed = memo(({ embed }: EmbedProps) => {
  const { url, caption } = embed;

  if (!isAllowedEmbedDomain(url)) {
    return (
      <div className={mediaContainer}>
        <ExternalLink href={url}>{url}</ExternalLink>
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
