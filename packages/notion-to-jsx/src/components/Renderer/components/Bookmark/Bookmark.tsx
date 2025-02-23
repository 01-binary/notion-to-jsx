import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { type RichTextItem } from '../../../../types';
import RichTexts from '../RichText/RichTexts';

interface OpenGraphData {
  title: string;
  description: string;
  image: string;
  siteName: string;
}

export interface BookmarkProps {
  url: string;
  caption?: RichTextItem[];
}

const Card = styled.div`
  margin: ${({ theme }) => theme.spacing.md} 0;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const Content = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  background: ${({ theme }) => theme.colors.code.background};
`;

const Title = styled.h4`
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text};
`;

const Description = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  color: ${({ theme }) => theme.colors.secondary};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const SiteName = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  color: ${({ theme }) => theme.colors.primary};
`;

const Caption = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
  padding-top: ${({ theme }) => theme.spacing.sm};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  color: ${({ theme }) => theme.colors.secondary};
`;

// 실제 프로덕션에서는 서버 사이드에서 처리하거나 전용 API를 사용해야 합니다
const fetchOpenGraphData = async (url: string): Promise<OpenGraphData> => {
  // 임시로 더미 데이터를 반환
  return {
    title: new URL(url).hostname,
    description: 'No description available',
    image: '',
    siteName: new URL(url).hostname.split('.')[1] as string,
  };
};

const Bookmark: React.FC<BookmarkProps> = ({ url, caption }) => {
  const [ogData, setOgData] = useState<OpenGraphData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadOgData = async () => {
      try {
        const data = await fetchOpenGraphData(url);
        setOgData(data);
      } catch (err) {
        setError(true);
      }
    };

    loadOgData();
  }, [url]);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: 'none' }}
    >
      <Card>
        {ogData?.image && (
          <PreviewImage src={ogData.image} alt={ogData.title} loading="lazy" />
        )}
        <Content>
          <Title>{ogData?.title || url}</Title>
          {ogData?.description && (
            <Description>{ogData.description}</Description>
          )}
          {ogData?.siteName && <SiteName>{ogData.siteName}</SiteName>}
          {caption && caption.length > 0 && (
            <Caption>
              <RichTexts richTexts={caption} />
            </Caption>
          )}
        </Content>
      </Card>
    </a>
  );
};

export default Bookmark;
