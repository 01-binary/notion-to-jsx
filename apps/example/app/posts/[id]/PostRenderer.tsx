'use client';

import { useState } from 'react';
import type { NotionBlock } from 'notion-to-jsx';
import { Renderer } from 'notion-to-jsx';

interface PostRendererProps {
  blocks: NotionBlock[];
  title?: string;
  cover?: string;
}

export default function PostRenderer({
  blocks,
  title,
  cover,
}: PostRendererProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? '#0d1117' : '#ffffff',
        minHeight: '100vh',
        transition: 'background-color 0.3s',
      }}
    >
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          border: 'none',
          cursor: 'pointer',
          backgroundColor: isDarkMode ? '#30363d' : '#f0f0f0',
          color: isDarkMode ? '#c9d1d9' : '#37352f',
          fontSize: '0.875rem',
          zIndex: 1000,
        }}
      >
        {isDarkMode ? '☀️ Light' : '🌙 Dark'}
      </button>

      <Renderer
        blocks={blocks}
        title={title}
        cover={cover}
        isDarkMode={isDarkMode}
        showToc
        tocStyle={{ top: '30%' }}
      />
    </div>
  );
}
