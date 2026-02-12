# notion-to-jsx

## 2.1.7

### Patch Changes

- c83f2fa: fix: Table, Toggle 다크모드 텍스트 색상 미적용 수정

## 2.1.6

### Patch Changes

- 895b61c: Embed 블록 지원 (CodeSandbox, CodePen)

## 2.1.5

### Patch Changes

- d12e145: SSR hydration mismatch 해결
  - CodeBlock: Prism 하이라이팅을 클라이언트에서만 실행하도록 변경
  - EmptyRichText: `<div>`를 `<span>`으로 변경하여 `<p>` 태그 내 유효한 HTML 구조 보장
  - turbo dev 태스크에 의존성 빌드 순서 추가

## 2.1.4

### Patch Changes

- 5141fc5: ToC 스크롤 위치 계산 정확도 개선

## 2.1.3

### Patch Changes

- c620e77: ToC scrollOffset prop 추가

## 2.1.2

### Patch Changes

- 09fa184: ToC 라인 두께 및 모서리 조정

## 2.1.1

### Patch Changes

- 5c3e4a3: showToc 기본값 설정

## 2.1.0

### Minor Changes

- 022b098: 목차(ToC) 기능 추가

## 2.0.1

### Patch Changes

- 9a372e1: 다크모드 하드코딩 색상을 테마 변수로 교체

## 2.0.0

### Major Changes

- 611bf5c: notion-types 공유 타입으로 타입 시스템 통일

## 1.3.2

### Patch Changes

- cdcf215: feat: React 19 지원

## 1.3.1

### Patch Changes

- 324e498: img render bug fix

## 1.3.0

### Minor Changes

- f82d93d: perf: React 컴포넌트 성능 최적화 및 메모이제이션 적용

## 1.2.16

### Patch Changes

- cb2897b: reset delete

## 1.2.15

### Patch Changes

- 6cc6dcb: dependency update

## 1.2.14

### Patch Changes

- 408433a: improve image loading state handling with useRef and complete check

## 1.2.13

### Patch Changes

- eea19de: reimplement list rendering with ListGroup component for nested lists / add empty rich text component

## 1.2.12

### Patch Changes

- 5de03d9: add loading state to image skeleton component

## 1.2.11

### Patch Changes

- 08d9e11: add video block support with YouTube embed functionality

## 1.2.10

### Patch Changes

- 36b54f7: refactor: components to use TypeScript types and remove React imports
- 2a96163: Update text color to use theme variable in List and Quote components

## 1.2.9

### Patch Changes

- 7619237: update font-family inheritance

## 1.2.8

### Patch Changes

- 3493118: Update link property type and access nested url property for text links, add loading skeleton to image and cover components

## 1.2.7

### Patch Changes

- 966553e: Remove fixed font size from code block styling, add getPageBlocks utility to fetch and parse Notion page blocks

## 1.2.6

### Patch Changes

- e19f523: fix: 뒤로가기 후 재 진입 시 Image 안나오는 현상 FIX

## 1.2.5

### Patch Changes

- 706b173: Add word break properties to link text

## 1.2.4

### Patch Changes

- ab8398a: Code Tokenize add

## 1.2.3

### Patch Changes

- 85f04ea: Column인 경우 Image size 조절

## 1.2.2

### Patch Changes

- a194921: Image Size fix

## 1.2.1

### Patch Changes

- 6272537: chore

## 1.2.0

### Minor Changes

- 54bd141: 미구현 컴포넌트 (Quote, Figma Type, Mention, Table, Toggle) 추가

## 1.1.1

### Patch Changes

- 148372b: prism css import delete

## 1.1.0

### Minor Changes

- 714d644: v1.1.0

## 1.0.0

### Major Changes

- 230b287: v1

## 0.3.0

### Minor Changes

- 630ca94: test

## 0.2.0

### Minor Changes

- e854e85: test

## 0.1.0

### Minor Changes

- 88d551f: test
