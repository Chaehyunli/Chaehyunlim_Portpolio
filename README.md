# Chaehyun Lim — Portfolio

백엔드 개발자 임채현의 포트폴리오 웹사이트. 프로필과 6개 프로젝트(모두약속·Masil·Searchive·PETNER·동아리모아·노소공)를 하나의 스크롤 페이지로 보여준다.

## 스택

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4

콘텐츠는 `content/projects.ts`에 TS 데이터로 관리한다. 디자인 톤과 구현 규칙은 [CLAUDE.md](./CLAUDE.md) 참고.

## 로컬 실행

```bash
npm install
npm run dev
```

http://localhost:3000 에서 확인.

## 배포

Vercel에 리포를 연결하면 별도 설정 없이 배포된다. `main` 브랜치 푸시가 곧 프로덕션 배포.

## 폴더 구조

```
app/            페이지, 레이아웃, 전역 스타일(globals.css)
components/     sections(프로필·프로젝트) / nav(목차) / ui(버튼·뱃지 등)
content/        projects.ts — 프로젝트 콘텐츠 데이터
lib/            useScrollSpy 등 훅
public/images/  프로젝트 스크린샷
docs/           설계 스펙 문서
```

자세한 설계 배경은 [docs/superpowers/specs/2026-08-23-portfolio-site-design.md](./docs/superpowers/specs/2026-08-23-portfolio-site-design.md) 참고.
