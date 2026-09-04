# Chaehyun Lim — Portfolio

백엔드 개발자 임채현의 포트폴리오 웹사이트. 홈(프로필·About·경력·6개 프로젝트 카드 그리드)과 프로젝트별 상세 페이지(`/[projectId]`)로 구성된다.

## 스택

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4

콘텐츠는 `content/projects.ts`(프로젝트) · `content/career.ts`(경력) · `content/profile.ts`(프로필)에 TS 데이터로 관리한다. 디자인 톤과 구현 규칙은 [CLAUDE.md](./CLAUDE.md) 참고.

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
app/            홈(page.tsx) · 프로젝트 상세([projectId]) · 레이아웃 · OG 이미지 · globals.css
components/      sections(Hero·About·Career·Timeline·ProjectDetail·DecisionBlock) / ui(Chip·Tag·FramedImage 등)
content/         projects.ts · career.ts · profile.ts · types.ts
public/images/   프로필·프로젝트 스크린샷·다이어그램
docs/            설계 스펙 문서
```

자세한 설계 배경은 [docs/superpowers/specs/2026-08-23-portfolio-site-design.md](./docs/superpowers/specs/2026-08-23-portfolio-site-design.md) 참고.
