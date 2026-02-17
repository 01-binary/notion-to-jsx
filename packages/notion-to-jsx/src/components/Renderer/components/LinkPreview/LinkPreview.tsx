import { memo } from 'react';
import {
  link,
  preview,
  iconContainer,
  icon,
  content,
  title,
  description,
  githubPreview,
  githubContent,
} from './styles.css';
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
  <div className={preview}>
    <div className={iconContainer}>
      <img
        src={data.thumbnailUrl || 'https://static.figma.com/app/icon/1/favicon.svg'}
        alt="Figma icon"
        className={icon}
      />
    </div>
    <div className={content}>
      <div className={title}>{data.name}</div>
      <div className={description}>www.figma.com</div>
    </div>
  </div>
));

FigmaPreview.displayName = 'FigmaPreview';

interface GitHubPreviewProps {
  repoData: RepoData | null;
  url: string;
  loading: boolean;
}

const GitHubPreview = memo(({ repoData, url, loading }: GitHubPreviewProps) => {
  const repoName = repoData?.name || extractRepoPathFromUrl(url)?.split('/')[1] || 'Repository';
  const updatedTimeText = repoData?.updated_at ? formatUpdatedTime(repoData.updated_at) : '';

  return (
    <div className={`${preview} ${githubPreview}`}>
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
      <div className={`${content} ${githubContent}`}>
        <div className={title}>{repoName}</div>
        <div className={description}>
          {loading ? <Skeleton width="60%" height="16px" /> : `${repoName} • ${updatedTimeText}`}
        </div>
      </div>
    </div>
  );
});

GitHubPreview.displayName = 'GitHubPreview';

interface DefaultPreviewProps {
  url: string;
}

const DefaultPreview = memo(({ url }: DefaultPreviewProps) => (
  <div className={preview}>
    <div className={content}>
      <div className={title}>{url}</div>
    </div>
  </div>
));

DefaultPreview.displayName = 'DefaultPreview';

// ============ 메인 컴포넌트 ============

export interface LinkPreviewProps {
  url: string;
}

const LinkPreview = ({ url }: LinkPreviewProps) => {
  const linkType = getLinkType(url);
  const figmaData = linkType === 'figma' ? extractFigmaData(url) : null;

  const { repoData, loading, hasError } = useGitHubRepo(url, linkType === 'github');

  const renderPreview = () => {
    if (linkType === 'figma' && figmaData) {
      return <FigmaPreview data={figmaData} />;
    }
    if (linkType === 'github') {
      if (hasError && !loading) {
        return <DefaultPreview url={url} />;
      }
      return <GitHubPreview repoData={repoData} url={url} loading={loading} />;
    }
    return <DefaultPreview url={url} />;
  };

  return (
    <ExternalLink href={url} className={link}>
      {renderPreview()}
    </ExternalLink>
  );
};

export default LinkPreview;
