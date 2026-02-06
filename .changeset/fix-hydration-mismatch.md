---
"notion-to-jsx": patch
---

SSR hydration mismatch 해결

- CodeBlock: Prism 하이라이팅을 클라이언트에서만 실행하도록 변경
- EmptyRichText: `<div>`를 `<span>`으로 변경하여 `<p>` 태그 내 유효한 HTML 구조 보장
- turbo dev 태스크에 의존성 빌드 순서 추가
