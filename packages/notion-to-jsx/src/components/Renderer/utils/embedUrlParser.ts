// YouTube
const YOUTUBE_SHORT_URL_REGEX = /youtu\.be\/([a-zA-Z0-9_-]+)/;
const YOUTUBE_WATCH_URL_REGEX = /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;

// CodeSandbox
const CODESANDBOX_REGEX = /codesandbox\.io\/(?:s|p\/sandbox)\/([a-zA-Z0-9_-]+)/;

// CodePen
const CODEPEN_REGEX =
  /codepen\.io\/([a-zA-Z0-9_-]+)\/(?:pen|full)\/([a-zA-Z0-9_-]+)/;

export const getVideoEmbedUrl = (url?: string): string => {
  if (!url) return '';

  const shortMatch = url.match(YOUTUBE_SHORT_URL_REGEX);
  if (shortMatch?.[1]) {
    return `https://www.youtube.com/embed/${shortMatch[1]}`;
  }

  const watchMatch = url.match(YOUTUBE_WATCH_URL_REGEX);
  if (watchMatch?.[1]) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`;
  }

  return url;
};

export const getEmbedUrl = (url: string): string => {
  const codesandboxMatch = url.match(CODESANDBOX_REGEX);
  if (codesandboxMatch?.[1]) {
    return `https://codesandbox.io/embed/${codesandboxMatch[1]}`;
  }

  const codepenMatch = url.match(CODEPEN_REGEX);
  if (codepenMatch?.[1] && codepenMatch?.[2]) {
    return `https://codepen.io/${codepenMatch[1]}/embed/${codepenMatch[2]}`;
  }

  return url;
};

export const getEmbedTitle = (url: string): string => {
  if (url.includes('codesandbox.io')) return 'CodeSandbox';
  if (url.includes('codepen.io')) return 'CodePen';
  return 'Embed';
};
