import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { NotionBlock } from 'notion-to-jsx';
import { notionClient } from '../../../lib/notion';
import PostRenderer from './PostRenderer';

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;

  try {
    const [blocks, properties] = await Promise.all([
      notionClient.getPageBlocks(id),
      notionClient.getPageProperties(id),
    ]);

    if (!blocks || blocks.length === 0) {
      notFound();
    }

    const title = (properties?.['Name'] as string) || (properties?.['title'] as string) || '';
    const coverUrl = (properties?.['coverUrl'] as string) || '';

    return (
      <article>
        <Link href="/posts" style={{ display: 'inline-block', marginBottom: '1.5rem' }}>
          &larr; 목록으로
        </Link>
        <PostRenderer
          blocks={blocks as unknown as NotionBlock[]}
          title={title}
          cover={coverUrl}
        />
      </article>
    );
  } catch (error) {
    return (
      <>
        <h1>오류</h1>
        <p style={{ color: '#e53e3e', marginTop: '1rem' }}>
          {error instanceof Error ? error.message : '페이지를 불러올 수 없습니다.'}
        </p>
        <Link href="/posts" style={{ display: 'inline-block', marginTop: '1rem' }}>&larr; 목록으로</Link>
      </>
    );
  }
}
