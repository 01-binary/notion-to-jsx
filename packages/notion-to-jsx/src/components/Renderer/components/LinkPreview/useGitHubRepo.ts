import { useState, useEffect } from 'react';
import { type RepoData, extractRepoPathFromUrl, fetchGitHubRepoData } from './utils';

interface UseGitHubRepoResult {
  repoData: RepoData | null;
  loading: boolean;
  hasError: boolean;
}

export const useGitHubRepo = (url: string, enabled: boolean): UseGitHubRepoResult => {
  const [repoData, setRepoData] = useState<RepoData | null>(null);
  const [loading, setLoading] = useState(enabled);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const abortController = new AbortController();
    setLoading(true);
    setHasError(false);

    const loadGitHubData = async () => {
      const repoPath = extractRepoPathFromUrl(url);
      if (repoPath) {
        const data = await fetchGitHubRepoData(repoPath, abortController.signal);
        if (!abortController.signal.aborted) {
          setRepoData(data);
          if (!data) setHasError(true);
        }
      } else if (!abortController.signal.aborted) {
        setHasError(true);
      }
      if (!abortController.signal.aborted) {
        setLoading(false);
      }
    };

    loadGitHubData();

    return () => {
      abortController.abort();
    };
  }, [url, enabled]);

  return { repoData, loading, hasError };
};
