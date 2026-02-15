import { memo } from 'react';
import { EmbedBlock } from '../../../../types';
import { Caption } from '../Caption';
import { mediaContainer } from '../Caption/styles.css';
import { getEmbedUrl, getEmbedTitle } from '../../utils/embedUrlParser';
import { embedIframe } from './styles.css';

interface EmbedProps {
  block: EmbedBlock;
}

const Embed = memo(({ block }: EmbedProps) => {
  if (block.type !== 'embed' || !block.embed) {
    return null;
  }

  const { url, caption } = block.embed;
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
