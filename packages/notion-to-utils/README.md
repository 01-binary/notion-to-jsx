# notion-to-utils

Notion API 래퍼 라이브러리입니다. 블록/속성 조회 시 이미지 메타데이터와 북마크 OG 데이터를 자동으로 처리합니다.

## 설치

```bash
pnpm add notion-to-utils
```

## 주요 기능

### Client

`@notionhq/client`를 확장한 클라이언트입니다. 기존 Notion SDK의 모든 기능을 사용할 수 있습니다.

```typescript
import Client from 'notion-to-utils';

const client = new Client({ auth: process.env.NOTION_TOKEN });
```

### getPageBlocks

페이지의 모든 블록을 재귀적으로 가져옵니다.

- 페이지네이션 자동 처리
- 중첩된 하위 블록 포함
- 이미지 블록: 크기 메타데이터 자동 추가 (`width`, `height`, `aspectRatio`)
- 북마크 블록: OG 메타데이터 자동 추가 (`title`, `description`, `image`, `favicon`)

```typescript
const blocks = await client.getPageBlocks('page-id');

// 이미지 블록 예시
// {
//   type: 'image',
//   image: {
//     file: { url: '...' },
//     format: { width: 1200, height: 800, aspectRatio: 1.5 }
//   }
// }

// 북마크 블록 예시
// {
//   type: 'bookmark',
//   bookmark: {
//     url: 'https://example.com',
//     metadata: { title: '...', description: '...', image: '...', favicon: '...' }
//   }
// }
```

### getPageProperties

페이지 속성을 조회합니다. 커버 이미지 URL도 함께 반환합니다.

```typescript
// 모든 속성의 값 추출
const props = await client.getPageProperties('page-id');
// { Title: '제목', Category: { name: 'Tech' }, Published: true, cover: 'https://...' }

// 특정 속성만 가져오기
const props = await client.getPageProperties('page-id', {
  keys: ['Title', 'Category'],
});

// 원본 속성 객체 가져오기 (값 추출 없이)
const props = await client.getPageProperties('page-id', {
  extractValues: false,
});
```

### getFileUrl

파일 속성에서 URL을 추출합니다.

```typescript
const fileUrl = await client.getFileUrl('page-id', 'Attachment');
// 'https://prod-files-secure.s3...'
```

### formatNotionImageUrl

S3 URL을 Notion 이미지 프록시 URL로 변환합니다. AWS 인증 파라미터를 제거하고 캐시 가능한 URL을 생성합니다.

```typescript
import { formatNotionImageUrl } from 'notion-to-utils';

const url = formatNotionImageUrl(
  'https://prod-files-secure.s3.us-west-2.amazonaws.com/...',
  'block-id'
);
// 'https://www.notion.so/image/https%3A%2F%2Fprod-files-secure...?table=block&id=block-id&cache=v2'
```

## 유틸리티 함수

```typescript
import {
  isImageBlock,
  isBookmarkBlock,
  hasChildren,
  extractImageUrl,
  extractDomain,
  createBookmarkMetadata,
} from 'notion-to-utils';

// 타입 가드
if (isImageBlock(block)) {
  // block.image 접근 가능
}

if (isBookmarkBlock(block)) {
  // block.bookmark 접근 가능
}

if (hasChildren(block)) {
  // block.children 존재
}

// 이미지 URL 추출
const url = extractImageUrl(block.image); // file 또는 external 모두 처리

// 도메인 추출
const domain = extractDomain('https://example.com/path'); // 'example.com'

// 북마크 메타데이터 생성
const metadata = createBookmarkMetadata('https://example.com', ogResult);
```

## 타입

```typescript
import type {
  NotionBlock,
  ImageBlockContent,
  ImageFormatMetadata,
  OpenGraphData,
  BookmarkBlockContent,
} from 'notion-to-utils';
```

## 라이선스

MIT
