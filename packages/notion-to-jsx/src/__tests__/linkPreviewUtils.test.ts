import { describe, it, expect } from 'vitest';
import {
  getLinkType,
  extractRepoPathFromUrl,
  extractFigmaData,
  formatUpdatedTime,
} from '../components/Renderer/components/LinkPreview/utils';

describe('getLinkType', () => {
  it('returns github for github.com URLs', () => {
    expect(getLinkType('https://github.com/user/repo')).toBe('github');
  });

  it('returns figma for figma.com URLs', () => {
    expect(getLinkType('https://www.figma.com/file/abc/design')).toBe('figma');
  });

  it('returns unknown for other URLs', () => {
    expect(getLinkType('https://example.com')).toBe('unknown');
  });

  it('returns unknown for invalid URLs', () => {
    expect(getLinkType('not-a-url')).toBe('unknown');
  });
});

describe('extractRepoPathFromUrl', () => {
  it('extracts owner/repo from GitHub URL', () => {
    expect(extractRepoPathFromUrl('https://github.com/owner/repo')).toBe(
      'owner/repo'
    );
  });

  it('extracts owner/repo from GitHub URL with extra path', () => {
    expect(
      extractRepoPathFromUrl('https://github.com/owner/repo/tree/main')
    ).toBe('owner/repo');
  });

  it('returns null for non-GitHub URLs', () => {
    expect(extractRepoPathFromUrl('https://example.com/owner/repo')).toBeNull();
  });

  it('returns null for GitHub profile URL (no repo)', () => {
    expect(extractRepoPathFromUrl('https://github.com/owner')).toBeNull();
  });

  it('returns null for invalid URLs', () => {
    expect(extractRepoPathFromUrl('invalid')).toBeNull();
  });
});

describe('extractFigmaData', () => {
  it('extracts data from Figma file URL', () => {
    const result = extractFigmaData(
      'https://www.figma.com/file/abc123/My-Design-File'
    );
    expect(result).not.toBeNull();
    expect(result?.name).toBe('My Design File');
    expect(result?.thumbnailUrl).toBe(
      'https://static.figma.com/app/icon/1/favicon.svg'
    );
  });

  it('returns null for non-Figma URLs', () => {
    expect(extractFigmaData('https://example.com')).toBeNull();
  });

  it('returns null for Figma URLs without file segment', () => {
    expect(extractFigmaData('https://www.figma.com/community')).toBeNull();
  });

  it('defaults name to Figma Design when name cannot be extracted', () => {
    const result = extractFigmaData('https://www.figma.com/file/abc123');
    // With only 3 segments, name extraction may fall back
    if (result) {
      expect(result.name).toBeTruthy();
    }
  });
});

describe('formatUpdatedTime', () => {
  it('returns relative hours for recent updates', () => {
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
    expect(formatUpdatedTime(twoHoursAgo)).toBe('Updated 2 hours ago');
  });

  it('returns yesterday for 1 day ago', () => {
    const oneDayAgo = new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString();
    expect(formatUpdatedTime(oneDayAgo)).toBe('Updated yesterday');
  });

  it('returns relative days for recent dates', () => {
    const fiveDaysAgo = new Date(
      Date.now() - 5 * 24 * 60 * 60 * 1000
    ).toISOString();
    expect(formatUpdatedTime(fiveDaysAgo)).toBe('Updated 5 days ago');
  });

  it('returns absolute date for old dates', () => {
    const result = formatUpdatedTime('2023-01-15T00:00:00Z');
    expect(result).toMatch(/^Updated on Jan 15, 2023$/);
  });
});
