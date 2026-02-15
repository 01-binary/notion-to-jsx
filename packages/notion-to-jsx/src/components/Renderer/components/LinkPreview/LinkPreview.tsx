import { useMemo, memo } from 'react';
import * as styles from './styles.css';
import Skeleton from '../../../../components/Skeleton';
import ExternalLink from '../shared/ExternalLink';
import {
  type RepoData,
  type FigmaData,
  getLinkType,
  extractRepoPathFromUrl,
  extractFigmaData,
  formatUpdatedTime,
} from './utils';
import { useGitHubRepo } from './useGitHubRepo';

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
        {loading ? <Skeleton width="60%" height="16px" /> : `${repoName} • ${updatedTimeText}`}
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
  const linkType = useMemo(() => getLinkType(url), [url]);
  const figmaData = useMemo(
    () => (linkType === 'figma' ? extractFigmaData(url) : null),
    [linkType, url]
  );

  const { repoData, loading, hasError } = useGitHubRepo(url, linkType === 'github');

  const repoName = useMemo(
    () => repoData?.name || extractRepoPathFromUrl(url)?.split('/')[1] || 'Repository',
    [repoData?.name, url]
  );

  const updatedTimeText = useMemo(
    () => (repoData?.updated_at ? formatUpdatedTime(repoData.updated_at) : ''),
    [repoData?.updated_at]
  );

  const renderPreview = () => {
    if (linkType === 'figma' && figmaData) {
      return <FigmaPreview data={figmaData} />;
    }
    if (linkType === 'github') {
      if (hasError && !loading) {
        return <DefaultPreview url={url} />;
      }
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
    <ExternalLink href={url} className={styles.link}>
      {renderPreview()}
    </ExternalLink>
  );
};

export default LinkPreview;
