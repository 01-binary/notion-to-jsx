# Nextra v4 문서 사이트 구축 계획

## Context

이슈 #108의 Nextra 문서 사이트 구축 파트. 한국어(기본)/영어 국제화(i18n) 지원.
Nextra swr-site 예제를 레퍼런스로 사용 (Next.js 16 + i18n + content directory 패턴 검증됨).

## 파일 구조

```
apps/docs/
├── package.json
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── postcss.config.js              # Tailwind CSS 4
├── mdx-components.tsx
├── proxy.ts                       # locale redirect (Next.js 16 proxy convention)
├── app/
│   └── [lang]/
│       ├── layout.tsx             # Nextra Layout + i18n
│       ├── styles.css             # Tailwind + Nextra CSS
│       └── [[...mdxPath]]/
│           └── page.tsx           # catch-all MDX 렌더링
├── _dictionaries/
│   ├── i18n-config.ts             # locale 설정 (기본: ko)
│   ├── en.ts                      # 영어 UI 번역
│   ├── ko.ts                      # 한국어 UI 번역
│   └── get-dictionary.ts          # dictionary loader
└── content/
    ├── en/
    │   ├── _meta.ts
    │   ├── index.mdx
    │   ├── getting-started/
    │   │   ├── _meta.ts
    │   │   ├── installation.mdx
    │   │   ├── notion-integration.mdx
    │   │   └── quick-start.mdx
    │   ├── notion-to-utils/
    │   │   ├── _meta.ts
    │   │   ├── client.mdx
    │   │   ├── get-page-blocks.mdx
    │   │   ├── get-page-properties.mdx
    │   │   ├── get-file-url.mdx
    │   │   └── format-notion-image-url.mdx
    │   ├── notion-to-jsx/
    │   │   ├── _meta.ts
    │   │   ├── renderer.mdx
    │   │   ├── supported-blocks.mdx
    │   │   ├── dark-mode.mdx
    │   │   ├── table-of-contents.mdx
    │   │   └── styling.mdx
    │   └── guides/
    │       ├── _meta.ts
    │       ├── nextjs-app-router.mdx
    │       └── typescript.mdx
    └── ko/                          # 동일 구조, 한국어 번역
        ├── _meta.ts
        ├── index.mdx
        ├── getting-started/...
        ├── notion-to-utils/...
        ├── notion-to-jsx/...
        └── guides/...
```

## 진행 상황

| Step | 상태 | 비고 |
|------|------|------|
| Step 1: 프로젝트 셋업 | Done | package.json, next.config.ts, tsconfig.json, eslint, mdx-components |
| Step 2: i18n 설정 | Done | _dictionaries, proxy.ts (middleware.ts에서 전환) |
| Step 3: App Router 파일 | Done | layout.tsx, page.tsx, styles.css |
| Step 4: 영어 콘텐츠 | Done | 전체 15페이지 작성 완료 |
| Step 5: 한국어 콘텐츠 | Done | 전체 15페이지 작성 완료 |
| Step 6: 검증 | Done | dev 서버 구동 확인, 전체 20개 경로 200 OK |

### 발견된 이슈 및 해결

- `middleware.ts` → `proxy.ts` 전환 — Next.js 16 proxy convention 사용, `_next/static` 등을 matcher에서 제외
- Tailwind CSS 4 필수 — `tailwindcss` + `@tailwindcss/postcss` devDeps 추가, `postcss.config.js` 생성
- `styles.css` — `@import 'tailwindcss'` + `@import 'nextra-theme-docs/style.css'` 통합
- `page.tsx` import 경로 — `../../../../mdx-components` → `../../../mdx-components`로 수정
- `_meta.ts` 검증 — Nextra가 _meta에 선언된 페이지가 실제 존재하는지 검증함
- defaultLocale 변경 — `en` → `ko` (루트 경로가 한국어, `/en`이 영어)
- `postcss.config.js` — `"type": "module"` 경고 (비차단, 동작에 문제 없음)
