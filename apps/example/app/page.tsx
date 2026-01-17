import Link from 'next/link';

export default function Home() {
  return (
    <>
      <h1>Notion to JSX Example</h1>
      <p style={{ marginTop: '1rem' }}>
        notion-to-utils와 notion-to-jsx를 테스트하기 위한 예제 앱입니다.
      </p>

      <h2 style={{ marginTop: '2rem' }}>사용 방법</h2>
      <ol style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
        <li>
          <code>.env.local</code> 파일에 Notion 토큰과 데이터베이스 ID를 설정하세요:
          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', marginTop: '0.5rem', borderRadius: '8px', overflow: 'auto' }}>
{`NOTION_TOKEN=your_notion_token
NOTION_DATABASE_ID=your_database_id`}
          </pre>
        </li>
        <li style={{ marginTop: '1rem' }}>
          <Link href="/posts">/posts</Link> 페이지에서 Notion 페이지 목록을 확인하세요.
        </li>
      </ol>
    </>
  );
}
