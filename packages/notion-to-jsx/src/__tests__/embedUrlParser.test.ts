import { describe, it, expect } from 'vitest';
import {
  getVideoEmbedUrl,
  getEmbedUrl,
  getEmbedTitle,
} from '../components/Renderer/utils/embedUrlParser';

describe('getVideoEmbedUrl', () => {
  it('returns empty string for undefined', () => {
    expect(getVideoEmbedUrl(undefined)).toBe('');
  });

  it('returns empty string for empty string', () => {
    expect(getVideoEmbedUrl('')).toBe('');
  });

  it('converts youtu.be short URL to embed URL', () => {
    expect(getVideoEmbedUrl('https://youtu.be/dQw4w9WgXcQ')).toBe(
      'https://www.youtube.com/embed/dQw4w9WgXcQ'
    );
  });

  it('converts youtube.com watch URL to embed URL', () => {
    expect(
      getVideoEmbedUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
    ).toBe('https://www.youtube.com/embed/dQw4w9WgXcQ');
  });

  it('returns original URL for non-YouTube URLs', () => {
    const url = 'https://vimeo.com/123456';
    expect(getVideoEmbedUrl(url)).toBe(url);
  });
});

describe('getEmbedUrl', () => {
  it('converts CodeSandbox URL to embed URL', () => {
    expect(getEmbedUrl('https://codesandbox.io/s/my-sandbox')).toBe(
      'https://codesandbox.io/embed/my-sandbox'
    );
  });

  it('converts CodeSandbox /p/sandbox/ URL to embed URL', () => {
    expect(getEmbedUrl('https://codesandbox.io/p/sandbox/my-sandbox')).toBe(
      'https://codesandbox.io/embed/my-sandbox'
    );
  });

  it('converts CodePen pen URL to embed URL', () => {
    expect(getEmbedUrl('https://codepen.io/user/pen/abc123')).toBe(
      'https://codepen.io/user/embed/abc123'
    );
  });

  it('converts CodePen full URL to embed URL', () => {
    expect(getEmbedUrl('https://codepen.io/user/full/abc123')).toBe(
      'https://codepen.io/user/embed/abc123'
    );
  });

  it('returns original URL for unknown embed sources', () => {
    const url = 'https://example.com/widget';
    expect(getEmbedUrl(url)).toBe(url);
  });
});

describe('getEmbedTitle', () => {
  it('returns CodeSandbox for codesandbox URLs', () => {
    expect(getEmbedTitle('https://codesandbox.io/embed/abc')).toBe(
      'CodeSandbox'
    );
  });

  it('returns CodePen for codepen URLs', () => {
    expect(getEmbedTitle('https://codepen.io/user/embed/abc')).toBe('CodePen');
  });

  it('returns Embed for unknown URLs', () => {
    expect(getEmbedTitle('https://example.com')).toBe('Embed');
  });
});
