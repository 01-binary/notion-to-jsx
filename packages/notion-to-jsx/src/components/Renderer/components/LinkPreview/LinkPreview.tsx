import React, { useState, useEffect } from 'react';
import {
  link,
  card,
  content,
  iconContainer,
  icon,
  title,
  updatedText,
} from './styles.css';

export interface LinkPreviewProps {
  url: string;
}

interface RepoData {
  name: string;
  full_name: string;
  owner: {
    avatar_url: string;
  };
  updated_at: string;
}

// GitHub 레포지토리 데이터를 가져오는 함수
const fetchGitHubRepoData = async (
  repoPath: string
): Promise<RepoData | null> => {
  try {
    const apiUrl = `https://api.github.com/repos/${repoPath}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub repo data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching GitHub repo data:', error);
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

// 날짜 포맷팅 함수
const formatUpdatedTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  );

  if (diffInHours < 24) {
    return `Updated ${diffInHours} hours ago`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) {
      return 'Updated yesterday';
    } else if (diffInDays < 30) {
      return `Updated ${diffInDays} days ago`;
    } else {
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      return `Updated on ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    }
  }
};

const LinkPreview: React.FC<LinkPreviewProps> = ({ url }) => {
  const [repoData, setRepoData] = useState<RepoData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRepoData = async () => {
      setLoading(true);
      const repoPath = extractRepoPathFromUrl(url);

      if (repoPath) {
        const data = await fetchGitHubRepoData(repoPath);
        setRepoData(data);
      }

      setLoading(false);
    };

    loadRepoData();
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

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={link}>
      <div className={card}>
        <div className={iconContainer}>
          <img
            src={
              repoData?.owner?.avatar_url ||
              'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
            }
            alt="Repository icon"
            className={icon}
          />
        </div>
        <div className={content}>
          <div className={title}>{repoName}</div>
          <div className={updatedText}>
            {loading ? 'Loading...' : `${repoName} • ${updatedTimeText}`}
          </div>
        </div>
      </div>
    </a>
  );
};

export default LinkPreview;
