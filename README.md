**한국어** | [English](./README.en.md)

# notion-to-jsx

[![npm version](https://img.shields.io/npm/v/notion-to-jsx.svg)](https://www.npmjs.com/package/notion-to-jsx)
[![npm version](https://img.shields.io/npm/v/notion-to-utils.svg?label=notion-to-utils)](https://www.npmjs.com/package/notion-to-utils)
[![license](https://img.shields.io/npm/l/notion-to-jsx.svg)](https://github.com/01-binary/notion-to-jsx/blob/main/LICENSE)

Notion 페이지를 React 컴포넌트로 렌더링하는 풀스택 솔루션입니다. 공식 Notion API로 데이터를 가져오고, JSX로 렌더링합니다.

**[Documentation](https://notion-to-jsx-docs.vercel.app)**

## Features

- **공식 Notion API** 기반 — `@notionhq/client` 확장
- **자동 메타데이터 주입** — 이미지 크기, 북마크 OG 데이터를 페칭 시 자동 처리
- **17개 블록 타입** 지원 — 텍스트, 리스트, 이미지, 코드, 테이블, 토글, 비디오, 임베드 등
- **다크 모드 / 목차** — 내장 테마와 자동 생성 목차
- **Zero-runtime CSS** — Vanilla Extract 기반 스타일링

## Packages

| 패키지 | 설명 | 버전 |
|--------|------|------|
| [notion-to-utils](./packages/notion-to-utils) | Notion API 래퍼 (데이터 페칭) | [![npm](https://img.shields.io/npm/v/notion-to-utils.svg)](https://www.npmjs.com/package/notion-to-utils) |
| [notion-to-jsx](./packages/notion-to-jsx) | Notion 블록 React 렌더러 | [![npm](https://img.shields.io/npm/v/notion-to-jsx.svg)](https://www.npmjs.com/package/notion-to-jsx) |

## Quick Start

### 1. 설치

```bash
pnpm add notion-to-utils notion-to-jsx react react-dom
```

### 2. 데이터 페칭 (서버)

```typescript
import Client from 'notion-to-utils';

const client = new Client({ auth: process.env.NOTION_TOKEN });

const blocks = await client.getPageBlocks('page-id');
const props = await client.getPageProperties('page-id');
```

### 3. 렌더링 (클라이언트)

```tsx
import { Renderer } from 'notion-to-jsx';

export default function NotionPage({ blocks, title, cover }) {
  return (
    <Renderer
      blocks={blocks}
      title={title}
      cover={cover}
      isDarkMode={false}
    />
  );
}
```

## 지원 블록 타입

| 카테고리 | 블록 |
|----------|------|
| 텍스트 | Paragraph, Heading 1/2/3, Quote |
| 리스트 | Bulleted List, Numbered List |
| 미디어 | Image, Video, Bookmark, Embed, Link Preview |
| 코드 | Code (구문 하이라이팅) |
| 구조 | Table, Toggle, Column |

## Contributing

```bash
git clone https://github.com/01-binary/notion-to-jsx.git
cd notion-to-jsx
pnpm install
pnpm dev
```

## 라이선스

MIT
