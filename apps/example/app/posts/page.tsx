import Link from 'next/link';
import { notionClient, databaseId } from '../../lib/notion';

export const dynamic = 'force-dynamic';

function getTitle(page: {
  id: string;
  properties: Record<string, unknown>;
}): string {
  const props = page.properties;
  for (const key of ['Name', 'Title', 'title', 'name']) {
    const prop = props[key] as
      | { title?: Array<{ plain_text: string }> }
      | undefined;
    if (prop?.title?.[0]?.plain_text) {
      return prop.title[0].plain_text;
    }
  }
  return page.id;
}

export default async function PostsPage() {
  if (!databaseId) {
    return (
      <>
        <h1>Posts</h1>
        <p style={{ color: '#e53e3e', marginTop: '1rem' }}>
          NOTION_DATABASE_ID가 설정되지 않았습니다. .env.local 파일을
          확인하세요.
        </p>
        <Link href="/" style={{ display: 'inline-block', marginTop: '1rem' }}>
          &larr; 홈으로
        </Link>
      </>
    );
  }

  try {
    const response = await notionClient.dataSources.query({
      data_source_id: databaseId,
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
    });
    const pages = response.results as Array<{
      id: string;
      properties: Record<string, unknown>;
    }>;

    return (
      <>
        <Link
          href="/"
          style={{ display: 'inline-block', marginBottom: '1rem' }}
        >
          &larr; 홈으로
        </Link>
        <h1>Posts</h1>

        <ul style={{ listStyle: 'none', padding: 0, marginTop: '1.5rem' }}>
          {pages.map((page) => (
            <li
              key={page.id}
              style={{
                marginBottom: '0.75rem',
                padding: '1rem',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                transition: 'box-shadow 0.2s',
              }}
            >
              <Link
                href={`/posts/${page.id}`}
                style={{ fontSize: '1.1rem', fontWeight: 500 }}
              >
                {getTitle(page)}
              </Link>
            </li>
          ))}
        </ul>

        {pages.length === 0 && (
          <p style={{ marginTop: '1rem', color: '#718096' }}>
            페이지가 없습니다.
          </p>
        )}
      </>
    );
  } catch (error) {
    return (
      <>
        <h1>Posts</h1>
        <p style={{ color: '#e53e3e', marginTop: '1rem' }}>
          Notion API 오류:{' '}
          {error instanceof Error ? error.message : '알 수 없는 오류'}
        </p>
        <Link href="/" style={{ display: 'inline-block', marginTop: '1rem' }}>
          &larr; 홈으로
        </Link>
      </>
    );
  }
}
