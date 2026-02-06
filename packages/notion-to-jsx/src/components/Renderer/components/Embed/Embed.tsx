import { memo } from 'react';
import { EmbedBlock } from '../../../../types';
import { MemoizedRichText } from '../MemoizedComponents';
import { embedContainer, embedIframe, embedCaption } from './styles.css';

interface EmbedProps {
  block: EmbedBlock;
}

const CODESANDBOX_REGEX = /codesandbox\.io\/(?:s|p\/sandbox)\/([a-zA-Z0-9_-]+)/;
const CODEPEN_REGEX = /codepen\.io\/([a-zA-Z0-9_-]+)\/(?:pen|full)\/([a-zA-Z0-9_-]+)/;

const getEmbedUrl = (url: string): string => {
  // CodeSandbox: /s/xxx 또는 /p/sandbox/xxx → /embed/xxx
  const codesandboxMatch = url.match(CODESANDBOX_REGEX);
  if (codesandboxMatch?.[1]) {
    return `https://codesandbox.io/embed/${codesandboxMatch[1]}`;
  }

  // CodePen: /pen/xxx → /embed/xxx
  const codepenMatch = url.match(CODEPEN_REGEX);
  if (codepenMatch?.[1] && codepenMatch?.[2]) {
    return `https://codepen.io/${codepenMatch[1]}/embed/${codepenMatch[2]}`;
  }

  // 이미 embed URL이거나 기타 URL
  return url;
};

const getEmbedTitle = (url: string): string => {
  if (url.includes('codesandbox.io')) return 'CodeSandbox';
  if (url.includes('codepen.io')) return 'CodePen';
  return 'Embed';
};

const Embed = memo(({ block }: EmbedProps) => {
  if (block.type !== 'embed' || !block.embed) {
    return null;
  }

  const { url, caption } = block.embed;
  const embedUrl = getEmbedUrl(url);
  const title = getEmbedTitle(url);

  return (
    <div className={embedContainer}>
      <iframe
        className={embedIframe}
        src={embedUrl}
        title={title}
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        allowFullScreen
      />
      {caption && caption.length > 0 && (
        <figcaption className={embedCaption}>
          <MemoizedRichText richTexts={caption} />
        </figcaption>
      )}
    </div>
  );
});

Embed.displayName = 'Embed';

export default Embed;
