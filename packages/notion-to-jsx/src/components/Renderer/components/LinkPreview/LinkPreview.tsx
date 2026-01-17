import { useState, useEffect, memo } from 'react';
import * as styles from './styles.css';

interface RepoData {
  name: string;
  full_name: string;
  owner: {
    avatar_url: string;
  };
  updated_at: string;
}

interface FigmaData {
  name: string;
  url: string;
  thumbnailUrl?: string;
}

// GitHub 레포지토리 데이터를 가져오는 함수
const fetchGitHubRepoData = async (
  repoPath: string,
  signal?: AbortSignal
): Promise<RepoData | null> => {
  try {
    const apiUrl = `https://api.github.com/repos/${repoPath}`;
    const response = await fetch(apiUrl, { signal });

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub repo data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // AbortError는 정상적인 cleanup이므로 무시
    if (error instanceof Error && error.name === 'AbortError') {
      return null;
    }
    console.error('Error fetching GitHub repo data:', error);
    return null;
  }
};

// Figma 파일 정보 추출 함수
const extractFigmaData = (url: string): FigmaData | null => {
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname.includes('figma.com')) {
      // URL에서 파일 이름 추출
      const pathSegments = parsedUrl.pathname.split('/');
      const fileSegment = pathSegments.find((segment) =>
        segment.includes('file')
      );

      if (!fileSegment) return null;

      // URL 경로에서 파일 이름 추출 (/file/ID/NAME 형식)
      let fileName = '';
      if (pathSegments.length > 3) {
        const encodedName = pathSegments[3];
        if (encodedName) {
          fileName = decodeURIComponent(encodedName).replace(/-/g, ' ');
        }
      }

      // 파일 이름이 추출되지 않았으면 URL에서 직접 찾기
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
  } catch (error) {
    console.error('Error parsing Figma URL:', error);
    return null;
  }
};

// GitHub URL에서 레포지토리 경로 추출
const extractRepoPathFromUrl = (url: string): string | null => {
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname === 'github.com') {
      // URL 경로에서 첫 번째 '/'를 제거하고 나머지 경로 반환
      const path = parsedUrl.pathname.substring(1);
      // 레포지토리 경로는 일반적으로 'username/repo-name' 형식
      const pathParts = path.split('/');
      if (pathParts.length >= 2) {
        return `${pathParts[0]}/${pathParts[1]}`;
      }
    }
    return null;
  } catch (error) {
    console.error('Error parsing URL:', error);
    return null;
  }
};

// URL이 어떤 타입의 링크인지 확인
const getLinkType = (url: string): 'github' | 'figma' | 'unknown' => {
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

// 월 이름 배열을 모듈 스코프로 이동 - 매 호출마다 재생성 방지
const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
] as const;

// 날짜 포맷팅 함수
const formatUpdatedTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  );

  if (diffInHours < 24) {
    return `Updated ${diffInHours} hours ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) {
    return 'Updated yesterday';
  }
  if (diffInDays < 30) {
    return `Updated ${diffInDays} days ago`;
  }

  return `Updated on ${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

// ============ 서브 컴포넌트 ============

interface FigmaPreviewProps {
  data: FigmaData;
}

const FigmaPreview = memo(({ data }: FigmaPreviewProps) => (
  <div className={styles.preview}>
    <div className={styles.iconContainer}>
      <img
        src={data.thumbnailUrl || 'https://static.figma.com/app/icon/1/favicon.svg'}
        alt="Figma icon"
        className={styles.icon}
      />
    </div>
    <div className={styles.content}>
      <div className={styles.title}>{data.name}</div>
      <div className={styles.description}>www.figma.com</div>
    </div>
  </div>
));

FigmaPreview.displayName = 'FigmaPreview';

interface GitHubPreviewProps {
  repoData: RepoData | null;
  repoName: string;
  updatedTimeText: string;
  loading: boolean;
}

const GitHubPreview = memo(({ repoData, repoName, updatedTimeText, loading }: GitHubPreviewProps) => (
  <div className={`${styles.preview} ${styles.githubPreview}`}>
    <div className={styles.iconContainer}>
      <img
        src={
          repoData?.owner?.avatar_url ||
          'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
        }
        alt="Repository icon"
        className={styles.icon}
      />
    </div>
    <div className={`${styles.content} ${styles.githubContent}`}>
      <div className={styles.title}>{repoName}</div>
      <div className={styles.description}>
        {loading ? 'Loading...' : `${repoName} • ${updatedTimeText}`}
      </div>
    </div>
  </div>
));

GitHubPreview.displayName = 'GitHubPreview';

interface DefaultPreviewProps {
  url: string;
}

const DefaultPreview = memo(({ url }: DefaultPreviewProps) => (
  <div className={styles.preview}>
    <div className={styles.content}>
      <div className={styles.title}>{url}</div>
    </div>
  </div>
));

DefaultPreview.displayName = 'DefaultPreview';

// ============ 메인 컴포넌트 ============

export interface LinkPreviewProps {
  url: string;
}

const LinkPreview = ({ url }: LinkPreviewProps) => {
  const [repoData, setRepoData] = useState<RepoData | null>(null);
  const [figmaData, setFigmaData] = useState<FigmaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [linkType, setLinkType] = useState<'github' | 'figma' | 'unknown'>(
    'unknown'
  );

  useEffect(() => {
    const abortController = new AbortController();

    const loadLinkData = async () => {
      setLoading(true);
      const type = getLinkType(url);
      setLinkType(type);

      if (type === 'github') {
        const repoPath = extractRepoPathFromUrl(url);
        if (repoPath) {
          const data = await fetchGitHubRepoData(repoPath, abortController.signal);
          // 취소된 요청이면 state 업데이트 하지 않음
          if (!abortController.signal.aborted) {
            setRepoData(data);
          }
        }
      } else if (type === 'figma') {
        const data = extractFigmaData(url);
        if (!abortController.signal.aborted) {
          setFigmaData(data);
        }
      }

      if (!abortController.signal.aborted) {
        setLoading(false);
      }
    };

    loadLinkData();

    // Cleanup: 컴포넌트 언마운트 또는 url 변경 시 요청 취소
    return () => {
      abortController.abort();
    };
  }, [url]);

  // 레포지토리 이름 추출 (full_name에서 organization/repo 형식)
  const repoName =
    repoData?.name ||
    extractRepoPathFromUrl(url)?.split('/')[1] ||
    'Repository';

  // 업데이트 시간 포맷팅
  const updatedTimeText = repoData?.updated_at
    ? formatUpdatedTime(repoData.updated_at)
    : '';

  const renderPreview = () => {
    if (linkType === 'figma' && figmaData) {
      return <FigmaPreview data={figmaData} />;
    }
    if (linkType === 'github') {
      return (
        <GitHubPreview
          repoData={repoData}
          repoName={repoName}
          updatedTimeText={updatedTimeText}
          loading={loading}
        />
      );
    }
    return <DefaultPreview url={url} />;
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.link}
    >
      {renderPreview()}
    </a>
  );
};

export default LinkPreview;
