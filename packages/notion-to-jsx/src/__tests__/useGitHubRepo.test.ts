import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useGitHubRepo } from '../components/Renderer/components/LinkPreview/useGitHubRepo';

const mockRepoData = {
  name: 'notion-to-jsx',
  full_name: 'owner/notion-to-jsx',
  owner: { avatar_url: 'https://avatars.githubusercontent.com/u/12345' },
  updated_at: '2025-01-01T00:00:00Z',
};

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn());
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('useGitHubRepo', () => {
  it('returns initial loading state when enabled', () => {
    vi.mocked(fetch).mockImplementation(() => new Promise(() => {}));

    const { result } = renderHook(() =>
      useGitHubRepo('https://github.com/owner/repo', true)
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.repoData).toBeNull();
    expect(result.current.hasError).toBe(false);
  });

  it('does not fetch when disabled', () => {
    const { result } = renderHook(() =>
      useGitHubRepo('https://github.com/owner/repo', false)
    );

    expect(result.current.loading).toBe(false);
    expect(result.current.repoData).toBeNull();
    expect(result.current.hasError).toBe(false);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('fetches and returns repo data on success', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockRepoData),
    } as Response);

    const { result } = renderHook(() =>
      useGitHubRepo('https://github.com/owner/notion-to-jsx', true)
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.repoData).toEqual(mockRepoData);
    expect(result.current.hasError).toBe(false);
  });

  it('sets hasError on fetch failure (non-ok response)', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({}),
    } as Response);

    const { result } = renderHook(() =>
      useGitHubRepo('https://github.com/owner/repo', true)
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.repoData).toBeNull();
    expect(result.current.hasError).toBe(true);
  });

  it('sets hasError when repo path cannot be extracted', async () => {
    const { result } = renderHook(() =>
      useGitHubRepo('https://github.com/only-owner', true)
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.repoData).toBeNull();
    expect(result.current.hasError).toBe(true);
  });

  it('aborts fetch on unmount', async () => {
    let abortSignal: AbortSignal | undefined;

    vi.mocked(fetch).mockImplementation((_url, init) => {
      abortSignal = init?.signal as AbortSignal;
      return new Promise(() => {});
    });

    const { unmount } = renderHook(() =>
      useGitHubRepo('https://github.com/owner/repo', true)
    );

    unmount();

    expect(abortSignal?.aborted).toBe(true);
  });
});
