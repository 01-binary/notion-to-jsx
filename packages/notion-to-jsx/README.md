**한국어** | [English](./README.en.md)

# notion-to-jsx

[![npm version](https://img.shields.io/npm/v/notion-to-jsx.svg)](https://www.npmjs.com/package/notion-to-jsx)
[![license](https://img.shields.io/npm/l/notion-to-jsx.svg)](https://github.com/01-binary/notion-to-jsx/blob/main/LICENSE)

Notion 블록을 React JSX 컴포넌트로 렌더링하는 라이브러리입니다. 다크 모드, 목차, 코드 하이라이팅을 지원합니다.

## 설치

```bash
pnpm add notion-to-jsx react react-dom
```

## 사용법

[notion-to-utils](https://www.npmjs.com/package/notion-to-utils)로 가져온 블록 데이터를 `Renderer`에 전달합니다.

```tsx
import { Renderer } from 'notion-to-jsx';
import type { NotionBlock } from 'notion-to-jsx';

interface Props {
  blocks: NotionBlock[];
  title: string;
  cover: string;
}

export default function NotionPage({ blocks, title, cover }: Props) {
  return (
    <Renderer
      blocks={blocks}
      title={title}
      cover={cover}
      isDarkMode={false}
      showToc={true}
      tocStyle={{ top: '80px', scrollOffset: 100 }}
    />
  );
}
```

## Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `blocks` | `NotionBlock[]` | (필수) | Notion 블록 배열 |
| `title` | `string` | - | 페이지 제목 |
| `cover` | `string` | - | 커버 이미지 URL |
| `isDarkMode` | `boolean` | `false` | 다크 모드 활성화 |
| `showToc` | `boolean` | `true` | 목차 표시 여부 |
| `tocStyle` | `TocStyleOptions` | - | 목차 스타일 옵션 |

### TocStyleOptions

```typescript
interface TocStyleOptions {
  top?: string;        // 목차 상단 위치 (CSS top 값)
  scrollOffset?: number; // 헤딩 클릭 시 스크롤 오프셋 (px)
}
```

## 지원 블록 타입

- **텍스트**: Paragraph, Heading 1/2/3, Quote
- **리스트**: Bulleted List, Numbered List
- **미디어**: Image, Video, Bookmark, Embed, Link Preview
- **코드**: Code (구문 하이라이팅)
- **구조**: Table, Toggle, Column
- **기타**: Cover, Title, Table of Contents

## 타입

```typescript
import type { NotionBlock, TocStyleOptions } from 'notion-to-jsx';
```

## 관련 패키지

- [notion-to-utils](https://www.npmjs.com/package/notion-to-utils) - Notion API 래퍼 (데이터 페칭)

## 라이선스

MIT
