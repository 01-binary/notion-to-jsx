import type { Metadata } from 'next';
import 'notion-to-jsx/dist/index.css';
import 'prismjs/themes/prism-tomorrow.css';
import './styles/globals.css';

export const metadata: Metadata = {
  title: 'Notion to JSX Example',
  description: 'Example app for testing notion-to-jsx and notion-to-utils',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <main style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
