export interface RepoData {
  name: string;
  full_name: string;
  owner: {
    avatar_url: string;
  };
  updated_at: string;
}

export interface FigmaData {
  name: string;
  url: string;
  thumbnailUrl?: string;
}

export type LinkType = 'github' | 'figma' | 'unknown';

export const getLinkType = (url: string): LinkType => {
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname === 'github.com') {
      return 'github';
    } else if (parsedUrl.hostname.includes('figma.com')) {
      return 'figma';
    }
    return 'unknown';
  } catch {
    return 'unknown';
  }
};

export const extractRepoPathFromUrl = (url: string): string | null => {
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname === 'github.com') {
      const path = parsedUrl.pathname.substring(1);
      const pathParts = path.split('/');
      if (pathParts.length >= 2) {
        return `${pathParts[0]}/${pathParts[1]}`;
      }
    }
    return null;
  } catch {
    return null;
  }
};

export const extractFigmaData = (url: string): FigmaData | null => {
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname.includes('figma.com')) {
      const pathSegments = parsedUrl.pathname.split('/');
      const fileSegment = pathSegments.find((segment) =>
        segment.includes('file')
      );

      if (!fileSegment) return null;

      let fileName = '';
      if (pathSegments.length > 3) {
        const encodedName = pathSegments[3];
        if (encodedName) {
          fileName = decodeURIComponent(encodedName).replace(/-/g, ' ');
        }
      }

      if (!fileName && parsedUrl.pathname.includes('-')) {
        const nameMatch = parsedUrl.pathname.match(/\/([^/]+)(?:\?|$)/);
        if (nameMatch?.[1]) {
          fileName = decodeURIComponent(nameMatch[1].replace(/-/g, ' '));
        }
      }

      fileName = fileName || 'Figma Design';

      return {
        name: fileName,
        url: url,
        thumbnailUrl: 'https://static.figma.com/app/icon/1/favicon.svg',
      };
    }
    return null;
  } catch {
    return null;
  }
};

const isRepoData = (data: unknown): data is RepoData => {
  if (typeof data !== 'object' || data === null) return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.name === 'string' &&
    typeof d.full_name === 'string' &&
    typeof d.updated_at === 'string' &&
    typeof d.owner === 'object' &&
    d.owner !== null &&
    typeof (d.owner as Record<string, unknown>).avatar_url === 'string'
  );
};

export const fetchGitHubRepoData = async (
  repoPath: string,
  signal?: AbortSignal
): Promise<RepoData | null> => {
  try {
    const apiUrl = `https://api.github.com/repos/${repoPath}`;
    const response = await fetch(apiUrl, { signal });

    if (!response.ok) {
      return null;
    }

    const data: unknown = await response.json();
    return isRepoData(data) ? data : null;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return null;
    }
    return null;
  }
};

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
] as const;

const MS_PER_HOUR = 1000 * 60 * 60;
const HOURS_PER_DAY = 24;
const DAYS_THRESHOLD_FOR_RELATIVE = 30;

export const formatUpdatedTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / MS_PER_HOUR
  );

  if (diffInHours < HOURS_PER_DAY) {
    return `Updated ${diffInHours} hours ago`;
  }

  const diffInDays = Math.floor(diffInHours / HOURS_PER_DAY);
  if (diffInDays === 1) {
    return 'Updated yesterday';
  }
  if (diffInDays < DAYS_THRESHOLD_FOR_RELATIVE) {
    return `Updated ${diffInDays} days ago`;
  }

  return `Updated on ${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};
