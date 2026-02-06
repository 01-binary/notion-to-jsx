# CLAUDE.md

## Package Manager

이 프로젝트는 pnpm을 사용합니다. npm이나 yarn을 절대 사용하지 마세요.

```bash
pnpm install    # 의존성 설치
pnpm build      # 빌드
pnpm test       # 테스트
pnpm dev        # 개발 모드
```

## Project Structure

모노레포 구조입니다. 각 패키지를 독립적으로 취급하세요.

- `packages/notion-to-jsx` - Notion 블록을 JSX로 렌더링하는 메인 라이브러리
- `packages/notion-to-utils` - Notion API 유틸리티 함수들

## Workflow

변경하기 전에, 간단한 계획을 보여줘: 어떤 파일을 수정하고 주요 변경 사항이 무엇인지. 내 승인을 기다려줘.
